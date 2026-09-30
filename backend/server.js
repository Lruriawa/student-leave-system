const express = require('express');
const cors = require('cors');
const path = require('path');
const studentDB = require('./data/students');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = 'admin123';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: '未授权，请先登录' });
  }
  next();
}

/* ========== 登录 ========== */
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: '登录成功', token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ success: false, message: '密码错误' });
  }
});

/* ========== 学生端 API ========== */

app.get('/api/students', (req, res) => {
  try {
    const students = studentDB.getAllStudents();
    const sorted = [...students].sort((a, b) => {
      if (b.leaveCount !== a.leaveCount) return b.leaveCount - a.leaveCount;
      return a.name.localeCompare(b.name);
    });
    res.json({ success: true, data: sorted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/students/:id', (req, res) => {
  try {
    const student = studentDB.findStudentById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/leave', (req, res) => {
  try {
    const { studentId, type = 'new', reason = '', expectedReturn = '' } = req.body;
    if (!studentId) return res.status(400).json({ success: false, message: '缺少 studentId' });
    const updated = studentDB.updateStudentLeave(studentId, type, reason, undefined, expectedReturn);
    if (!updated) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: '已提交，等待管理员审核', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    res.json({ success: true, data: studentDB.getStats() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/classes', (req, res) => {
  try {
    res.json({ success: true, data: studentDB.getClasses() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/students/:id/history', (req, res) => {
  try {
    const history = studentDB.getHistory(req.params.id);
    if (history === null) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ========== 晚到 API ========== */
app.post('/api/late', (req, res) => {
  try {
    const { studentId, date, time, reason = '', recorder = '学生本人' } = req.body;
    if (!studentId || !date) {
      return res.status(400).json({ success: false, message: '缺少 studentId 或 date' });
    }
    const result = studentDB.addLateRecord(studentId, {
      date, time, reason, status: 'pending', recorder, arrived: null
    });
    if (!result) return res.status(404).json({ success: false, message: '学生不存在' });
    if (result.error) return res.status(400).json({ success: false, message: result.error });
    res.json({ success: true, message: '已提交，等待管理员审核', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/students/:id/late', (req, res) => {
  try {
    const records = studentDB.getLateRecords(req.params.id);
    if (records === null) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ========== 后台 API（需鉴权） ========== */

/* ---- 请假历史 ---- */
app.post('/api/students/:id/history', requireAdmin, (req, res) => {
  try {
    const { date, type = 'new', reason = '', status = 'approved', expectedReturn = '' } = req.body;
    if (!date) return res.status(400).json({ success: false, message: '请选择日期' });
    const record = studentDB.addHistory(req.params.id, { date, type, reason, status, expectedReturn });
    if (!record) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: '添加成功', data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/students/:id/history/:historyId', requireAdmin, (req, res) => {
  try {
    const record = studentDB.updateHistory(req.params.id, req.params.historyId, req.body);
    if (!record) return res.status(404).json({ success: false, message: '记录不存在' });
    res.json({ success: true, message: '更新成功', data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/students/:id/history/:historyId', requireAdmin, (req, res) => {
  try {
    const student = studentDB.deleteHistory(req.params.id, req.params.historyId);
    if (!student) return res.status(404).json({ success: false, message: '记录不存在' });
    res.json({ success: true, message: '删除成功', data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/students/:id/history/:historyId/review', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status 必须是 approved 或 rejected' });
    }
    const record = studentDB.reviewHistory(req.params.id, req.params.historyId, status);
    if (!record) return res.status(404).json({ success: false, message: '记录不存在' });
    res.json({ success: true, message: status === 'approved' ? '已通过' : '已驳回', data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/students/:id/review-all', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status 必须是 approved 或 rejected' });
    }
    const result = studentDB.reviewAllPending(req.params.id, status);
    if (!result) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: `已${status === 'approved' ? '通过' : '驳回'} ${result.count} 条`, data: result.student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/pending', requireAdmin, (req, res) => {
  try {
    res.json({ success: true, data: studentDB.getAllPending() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/reviewed', requireAdmin, (req, res) => {
  try {
    res.json({ success: true, data: studentDB.getAllReviewed() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ---- 晚到后台 ---- */
app.post('/api/students/:id/late', requireAdmin, (req, res) => {
  try {
    const { date, time = '', reason = '', status = 'approved', recorder = '管理员', arrived = null } = req.body;
    if (!date) return res.status(400).json({ success: false, message: '请选择日期' });
    const result = studentDB.addLateRecord(req.params.id, { date, time, reason, status, recorder, arrived });
    if (!result) return res.status(404).json({ success: false, message: '学生不存在' });
    if (result.error) return res.status(400).json({ success: false, message: result.error });
    res.json({ success: true, message: '添加成功', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/students/:id/late/:lateId', requireAdmin, (req, res) => {
  try {
    const record = studentDB.updateLateRecord(req.params.id, req.params.lateId, req.body);
    if (!record) return res.status(404).json({ success: false, message: '记录不存在' });
    res.json({ success: true, message: '更新成功', data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/students/:id/late/:lateId', requireAdmin, (req, res) => {
  try {
    const student = studentDB.deleteLateRecord(req.params.id, req.params.lateId);
    if (!student) return res.status(404).json({ success: false, message: '记录不存在' });
    res.json({ success: true, message: '删除成功', data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/students/:id/late/:lateId/review', requireAdmin, (req, res) => {
  try {
    const { status, arrived } = req.body;
    if (status && !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status 必须是 approved 或 rejected' });
    }
    const record = studentDB.reviewLateRecord(req.params.id, req.params.lateId, { status, arrived });
    if (!record) return res.status(404).json({ success: false, message: '记录不存在' });
    const msg = status === 'approved' ? '已通过' : (status === 'rejected' ? '已驳回' : '已更新');
    res.json({ success: true, message: msg, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/late/pending', requireAdmin, (req, res) => {
  try {
    res.json({ success: true, data: studentDB.getAllLatePending() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ---- 学生管理 ---- */
app.post('/api/admin/students', requireAdmin, (req, res) => {
  try {
    const { name, class: className, type } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ success: false, message: '姓名不能为空' });
    const newStudent = studentDB.addStudent(name, className, type);
    res.json({ success: true, message: '添加成功', data: newStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/admin/students/:id', requireAdmin, (req, res) => {
  try {
    const updated = studentDB.updateStudentInfo(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: '更新成功', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/admin/students/:id', requireAdmin, (req, res) => {
  try {
    if (!studentDB.deleteStudent(req.params.id)) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: '删除成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/students/:id/reset', requireAdmin, (req, res) => {
  try {
    const updated = studentDB.resetStudentLeaves(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: '学生不存在' });
    res.json({ success: true, message: '已重置', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/reset', requireAdmin, (req, res) => {
  try {
    res.json({ success: true, message: '已重置', data: studentDB.resetToDefault() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ 后端服务已启动: http://localhost:${PORT}`);
  console.log(`🔐 后台密码: ${ADMIN_PASSWORD}`);
});