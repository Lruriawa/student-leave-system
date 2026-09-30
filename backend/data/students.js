const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

const DEFAULT_STUDENTS = [
  { 
    id: 's1', name: '张明', class: '三年级1班', type: 'boarding', leaveCount: 2, lastLeave: '2025-03-10', reason: '感冒', onLeave: false,
    history: [
      { id: 'h1', date: '2025-03-08', type: 'new', reason: '感冒', status: 'approved', expectedReturn: '14:00' },
      { id: 'h2', date: '2025-03-10', type: 'extend', reason: '感冒未愈', status: 'approved', expectedReturn: '' },
      { id: 'h3', date: '2025-03-12', type: 'return', reason: '已返校', status: 'approved', expectedReturn: '' }
    ],
    lateRecords: [
      { id: 'l1', date: '2025-03-15', time: '08:20', reason: '路上堵车', status: 'approved', recorder: '学生本人', arrived: true }
    ]
  },
  { id: 's2', name: '李丽', class: '三年级1班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', onLeave: false, history: [], lateRecords: [] },
  { 
    id: 's3', name: '王浩', class: '三年级2班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-12', reason: '家事', onLeave: true,
    history: [{ id: 'h4', date: '2025-03-12', type: 'new', reason: '家事', status: 'approved', expectedReturn: '10:30' }],
    lateRecords: []
  },
  { 
    id: 's4', name: '陈静', class: '三年级1班', type: 'day', leaveCount: 3, lastLeave: '2025-03-14', reason: '病假', onLeave: false,
    history: [
      { id: 'h5', date: '2025-03-09', type: 'new', reason: '病假', status: 'approved', expectedReturn: '09:00' },
      { id: 'h6', date: '2025-03-11', type: 'extend', reason: '病假未愈', status: 'approved', expectedReturn: '10:00' },
      { id: 'h7', date: '2025-03-14', type: 'extend', reason: '病假', status: 'approved', expectedReturn: '08:30' }
    ],
    lateRecords: [
      { id: 'l2', date: '2025-03-16', time: '08:35', reason: '地铁延误', status: 'pending', recorder: '学生本人', arrived: null }
    ]
  },
  { id: 's5', name: '赵岩', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', onLeave: false, history: [], lateRecords: [] },
  { 
    id: 's6', name: '周婷', class: '三年级1班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-09', reason: '事假', onLeave: true,
    history: [{ id: 'h8', date: '2025-03-09', type: 'new', reason: '事假', status: 'approved', expectedReturn: '13:00' }],
    lateRecords: []
  },
  { id: 's7', name: '吴迪', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', onLeave: false, history: [], lateRecords: [] }
];

let students = [];
let idCounter = 100;
let historyIdCounter = 100;
let lateIdCounter = 100;

function saveDB() {
  try {
    const data = { students, idCounter, historyIdCounter, lateIdCounter };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('❌ 保存数据库失败:', err);
  }
}

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const data = JSON.parse(raw);
      students = (data.students || []).map(s => ({
        ...s,
        history: (s.history || []).map(h => ({ ...h, expectedReturn: h.expectedReturn || '' })),
        lateRecords: s.lateRecords || []
      }));
      idCounter = data.idCounter || 100;
      historyIdCounter = data.historyIdCounter || 100;
      lateIdCounter = data.lateIdCounter || 100;
      console.log(`✅ 已加载 ${students.length} 名学生`);
    } else {
      students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
      idCounter = 100;
      historyIdCounter = 100;
      lateIdCounter = 100;
      saveDB();
      console.log(`✅ 已创建数据库并写入演示数据`);
    }
  } catch (err) {
    console.error('❌ 加载失败:', err);
    students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    saveDB();
  }
}

loadDB();

function generateId() { return 's' + (++idCounter); }
function generateHistoryId() { return 'h' + (++historyIdCounter); }
function generateLateId() { return 'l' + (++lateIdCounter); }

function getAllStudents() { return students; }
function findStudentById(id) { return students.find(s => s.id === id); }
function getStudentsByClass(className) {
  if (!className || className === 'all') return students;
  return students.filter(s => s.class === className);
}
function getStudentsByType(type) {
  if (!type || type === 'all') return students;
  return students.filter(s => s.type === type);
}
function getClasses() {
  return [...new Set(students.map(s => s.class).filter(Boolean))].sort();
}

/* ========== 请假：重算统计 ========== */
function recalcStudent(student) {
  const approved = (student.history || []).filter(h => h.status === 'approved');
  const leaveRecords = approved.filter(h => h.type !== 'return');
  student.leaveCount = leaveRecords.length;
  const sorted = [...approved].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  student.onLeave = last ? last.type !== 'return' : false;
  if (last) {
    student.lastLeave = last.date;
    student.reason = last.reason || '';
  } else {
    student.lastLeave = '';
    student.reason = '';
  }
}

/* ========== 请假 CRUD ========== */
function updateStudentLeave(id, type, reason, customDate, expectedReturn) {
  const student = findStudentById(id);
  if (!student) return null;
  if (!student.history) student.history = [];
  const today = new Date();
  const dateStr = customDate || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const newRecord = {
    id: generateHistoryId(),
    date: dateStr,
    type,
    reason: reason && reason.trim() ? reason.trim() : (type === 'extend' ? '续假' : (type === 'return' ? '销假' : '请假')),
    status: 'pending',
    expectedReturn: expectedReturn || ''
  };
  student.history.push(newRecord);
  recalcStudent(student);
  saveDB();
  return student;
}

function addStudent(name, className, type = 'day') {
  if (!name || !name.trim()) return null;
  const newStudent = {
    id: generateId(), name: name.trim(), class: className || '未分班',
    type: type || 'day',
    leaveCount: 0, lastLeave: '', reason: '', onLeave: false, history: [], lateRecords: []
  };
  students.push(newStudent);
  saveDB();
  return newStudent;
}

function deleteStudent(id) {
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return false;
  students.splice(idx, 1);
  saveDB();
  return true;
}

function updateStudentInfo(id, { name, class: className, type }) {
  const student = findStudentById(id);
  if (!student) return null;
  if (name && name.trim()) student.name = name.trim();
  if (className !== undefined) student.class = className.trim() || '未分班';
  if (type && ['boarding', 'day'].includes(type)) student.type = type;
  saveDB();
  return student;
}

function resetStudentLeaves(id) {
  const student = findStudentById(id);
  if (!student) return null;
  student.history = [];
  recalcStudent(student);
  saveDB();
  return student;
}

function getHistory(studentId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  return [...(student.history || [])].sort((a, b) => b.date.localeCompare(a.date));
}

function addHistory(studentId, { date, type, reason, status = 'approved', expectedReturn = '' }) {
  const student = findStudentById(studentId);
  if (!student || !date) return null;
  if (!student.history) student.history = [];
  const record = {
    id: generateHistoryId(), date, type: type || 'new',
    reason: reason || '请假', status,
    expectedReturn: expectedReturn || ''
  };
  student.history.push(record);
  recalcStudent(student);
  saveDB();
  return record;
}

function updateHistory(studentId, historyId, { date, type, reason, status, expectedReturn }) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = (student.history || []).find(h => h.id === historyId);
  if (!record) return null;
  if (date) record.date = date;
  if (type) record.type = type;
  if (reason !== undefined) record.reason = reason;
  if (status) record.status = status;
  if (expectedReturn !== undefined) record.expectedReturn = expectedReturn;
  recalcStudent(student);
  saveDB();
  return record;
}

function deleteHistory(studentId, historyId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const idx = (student.history || []).findIndex(h => h.id === historyId);
  if (idx === -1) return null;
  student.history.splice(idx, 1);
  recalcStudent(student);
  saveDB();
  return student;
}

function reviewHistory(studentId, historyId, status) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = (student.history || []).find(h => h.id === historyId);
  if (!record) return null;
  record.status = status;
  recalcStudent(student);
  saveDB();
  return record;
}

function reviewAllPending(studentId, status) {
  const student = findStudentById(studentId);
  if (!student) return null;
  let count = 0;
  (student.history || []).forEach(h => {
    if (h.status === 'pending') { h.status = status; count++; }
  });
  recalcStudent(student);
  saveDB();
  return { student, count };
}

function getAllPending() {
  const list = [];
  students.forEach(s => {
    (s.history || []).forEach(h => {
      if (h.status === 'pending') {
        list.push({
          studentId: s.id, studentName: s.name, studentClass: s.class,
          studentType: s.type,
          historyId: h.id, date: h.date, type: h.type, reason: h.reason, status: h.status,
          expectedReturn: h.expectedReturn || ''
        });
      }
    });
  });
  return list.sort((a, b) => b.date.localeCompare(a.date));
}

function getAllReviewed() {
  const list = [];
  students.forEach(s => {
    (s.history || []).forEach(h => {
      if (h.status !== 'pending') {
        list.push({
          studentId: s.id, studentName: s.name, studentClass: s.class,
          studentType: s.type,
          historyId: h.id, date: h.date, type: h.type, reason: h.reason, status: h.status,
          expectedReturn: h.expectedReturn || ''
        });
      }
    });
  });
  return list.sort((a, b) => b.date.localeCompare(a.date));
}

/* ========== 晚到 CRUD ========== */
function getLateRecords(studentId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  return [...(student.lateRecords || [])].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return (b.time || '').localeCompare(a.time || '');
  });
}

function addLateRecord(studentId, { date, time, reason, status = 'pending', recorder = '学生本人', arrived = null }) {
  const student = findStudentById(studentId);
  if (!student || !date) return null;
  if (!student.lateRecords) student.lateRecords = [];
  const exist = student.lateRecords.find(l => l.date === date);
  if (exist) return { error: '该学生当天已有晚到记录' };
  const record = {
    id: generateLateId(),
    date,
    time: time || '',
    reason: reason || '晚到',
    status,
    recorder,
    arrived
  };
  student.lateRecords.push(record);
  saveDB();
  return record;
}

function updateLateRecord(studentId, lateId, { date, time, reason, status, recorder, arrived }) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = (student.lateRecords || []).find(l => l.id === lateId);
  if (!record) return null;
  if (date !== undefined && date) record.date = date;
  if (time !== undefined) record.time = time;
  if (reason !== undefined) record.reason = reason;
  if (status !== undefined) record.status = status;
  if (recorder !== undefined) record.recorder = recorder;
  if (arrived !== undefined) record.arrived = arrived;
  saveDB();
  return record;
}

function deleteLateRecord(studentId, lateId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const idx = (student.lateRecords || []).findIndex(l => l.id === lateId);
  if (idx === -1) return null;
  student.lateRecords.splice(idx, 1);
  saveDB();
  return student;
}

function reviewLateRecord(studentId, lateId, { status, arrived }) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = (student.lateRecords || []).find(l => l.id === lateId);
  if (!record) return null;
  if (status) record.status = status;
  if (arrived !== undefined) record.arrived = arrived;
  saveDB();
  return record;
}

function getAllLatePending() {
  const list = [];
  students.forEach(s => {
    (s.lateRecords || []).forEach(l => {
      if (l.status === 'pending') {
        list.push({
          studentId: s.id, studentName: s.name, studentClass: s.class, studentType: s.type,
          lateId: l.id, date: l.date, time: l.time, reason: l.reason,
          status: l.status, recorder: l.recorder, arrived: l.arrived
        });
      }
    });
  });
  return list.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return (b.time || '').localeCompare(a.time || '');
  });
}

function getLateCount(student) {
  return (student.lateRecords || []).filter(l => l.status === 'approved').length;
}

/* ========== 重置 & 统计 ========== */
function resetToDefault() {
  students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
  idCounter = 100;
  historyIdCounter = 100;
  lateIdCounter = 100;
  saveDB();
  return students;
}

function getStats(className, type) {
  let filtered = getStudentsByClass(className);
  if (type && type !== 'all') filtered = filtered.filter(s => s.type === type);

  const totalStudents = filtered.length;
  const totalLeaves = filtered.reduce((sum, s) => sum + (s.leaveCount || 0), 0);
  const totalLate = filtered.reduce((sum, s) => sum + getLateCount(s), 0);
  const pendingLateCount = filtered.reduce((sum, s) => 
    sum + (s.lateRecords || []).filter(l => l.status === 'pending').length, 0);
  const boardingCount = students.filter(s => s.type === 'boarding').length;
  const dayCount = students.filter(s => s.type === 'day').length;

  let topStudent = '—';
  let maxCount = -1;
  filtered.forEach(s => {
    if (s.leaveCount > maxCount) { maxCount = s.leaveCount; topStudent = s.name; }
  });
  if (maxCount <= 0) topStudent = '—';

  let topLateStudent = '—';
  let maxLateCount = -1;
  filtered.forEach(s => {
    const c = getLateCount(s);
    if (c > maxLateCount) { maxLateCount = c; topLateStudent = s.name; }
  });
  if (maxLateCount <= 0) topLateStudent = '—';

  const fullAttendance = filtered.filter(s => s.leaveCount === 0).length;
  const avgLeaves = totalStudents > 0 ? (totalLeaves / totalStudents).toFixed(2) : 0;
  const pendingCount = filtered.reduce((sum, s) => 
    sum + (s.history || []).filter(h => h.status === 'pending').length, 0);

  return {
    totalStudents, totalLeaves, topStudent, fullAttendance, avgLeaves, pendingCount,
    boardingCount, dayCount,
    totalLate, pendingLateCount, topLateStudent
  };
}

module.exports = {
  getAllStudents, findStudentById, getStudentsByClass, getStudentsByType, getClasses,
  updateStudentLeave, addStudent, deleteStudent, updateStudentInfo,
  resetStudentLeaves, resetToDefault, getStats,
  getHistory, addHistory, updateHistory, deleteHistory,
  reviewHistory, reviewAllPending, getAllPending, getAllReviewed,
  getLateRecords, addLateRecord, updateLateRecord, deleteLateRecord,
  reviewLateRecord, getAllLatePending, getLateCount
};