// 简易内存数据库
let students = [
  { 
    id: 's1', name: '张明', class: '三年级1班', type: 'boarding', leaveCount: 2, lastLeave: '2025-03-10', reason: '感冒', 
    history: [
      { id: 'h1', date: '2025-03-08', type: 'new', reason: '感冒', status: 'approved' },
      { id: 'h2', date: '2025-03-10', type: 'extend', reason: '感冒未愈', status: 'approved' }
    ]
  },
  { id: 's2', name: '李丽', class: '三年级1班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] },
  { 
    id: 's3', name: '王浩', class: '三年级2班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-12', reason: '家事', 
    history: [{ id: 'h3', date: '2025-03-12', type: 'new', reason: '家事', status: 'pending' }]
  },
  { 
    id: 's4', name: '陈静', class: '三年级1班', type: 'day', leaveCount: 3, lastLeave: '2025-03-14', reason: '病假', 
    history: [
      { id: 'h4', date: '2025-03-09', type: 'new', reason: '病假', status: 'approved' },
      { id: 'h5', date: '2025-03-11', type: 'extend', reason: '病假未愈', status: 'approved' },
      { id: 'h6', date: '2025-03-14', type: 'extend', reason: '病假', status: 'approved' }
    ]
  },
  { id: 's5', name: '赵岩', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] },
  { 
    id: 's6', name: '周婷', class: '三年级1班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-09', reason: '事假', 
    history: [{ id: 'h7', date: '2025-03-09', type: 'new', reason: '事假', status: 'pending' }]
  },
  { id: 's7', name: '吴迪', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] }
];

let idCounter = 100;
let historyIdCounter = 100;

function generateId() { return 's' + (++idCounter); }
function generateHistoryId() { return 'h' + (++historyIdCounter); }

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

function recalcStudent(student) {
  const approved = student.history.filter(h => h.status === 'approved');
  student.leaveCount = approved.length;
  if (approved.length > 0) {
    const sorted = [...approved].sort((a, b) => a.date.localeCompare(b.date));
    const last = sorted[sorted.length - 1];
    student.lastLeave = last.date;
    student.reason = last.reason || '请假';
  } else {
    student.lastLeave = '';
    student.reason = '';
  }
}

function updateStudentLeave(id, type, reason, customDate) {
  const student = findStudentById(id);
  if (!student) return null;
  const today = new Date();
  const dateStr = customDate || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const newRecord = {
    id: generateHistoryId(),
    date: dateStr,
    type,
    reason: reason && reason.trim() ? reason.trim() : (type === 'extend' ? '续假' : '请假'),
    status: 'pending'
  };
  student.history.push(newRecord);
  recalcStudent(student);
  return student;
}

function addStudent(name, className, type = 'day') {
  if (!name || !name.trim()) return null;
  const newStudent = {
    id: generateId(), name: name.trim(), class: className || '未分班',
    type: type || 'day',
    leaveCount: 0, lastLeave: '', reason: '', history: []
  };
  students.push(newStudent);
  return newStudent;
}

function deleteStudent(id) {
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return false;
  students.splice(idx, 1);
  return true;
}

function updateStudentInfo(id, { name, class: className, type }) {
  const student = findStudentById(id);
  if (!student) return null;
  if (name && name.trim()) student.name = name.trim();
  if (className !== undefined) student.class = className.trim() || '未分班';
  if (type && ['boarding', 'day'].includes(type)) student.type = type;
  return student;
}

function resetStudentLeaves(id) {
  const student = findStudentById(id);
  if (!student) return null;
  student.history = [];
  recalcStudent(student);
  return student;
}

function getHistory(studentId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  return [...student.history].sort((a, b) => b.date.localeCompare(a.date));
}

function addHistory(studentId, { date, type, reason, status = 'approved' }) {
  const student = findStudentById(studentId);
  if (!student || !date) return null;
  const record = {
    id: generateHistoryId(), date, type: type || 'new',
    reason: reason || '请假', status
  };
  student.history.push(record);
  recalcStudent(student);
  return record;
}

function updateHistory(studentId, historyId, { date, type, reason, status }) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = student.history.find(h => h.id === historyId);
  if (!record) return null;
  if (date) record.date = date;
  if (type) record.type = type;
  if (reason !== undefined) record.reason = reason;
  if (status) record.status = status;
  recalcStudent(student);
  return record;
}

function deleteHistory(studentId, historyId) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const idx = student.history.findIndex(h => h.id === historyId);
  if (idx === -1) return null;
  student.history.splice(idx, 1);
  recalcStudent(student);
  return student;
}

function reviewHistory(studentId, historyId, status) {
  const student = findStudentById(studentId);
  if (!student) return null;
  const record = student.history.find(h => h.id === historyId);
  if (!record) return null;
  record.status = status;
  recalcStudent(student);
  return record;
}

function reviewAllPending(studentId, status) {
  const student = findStudentById(studentId);
  if (!student) return null;
  let count = 0;
  student.history.forEach(h => {
    if (h.status === 'pending') { h.status = status; count++; }
  });
  recalcStudent(student);
  return { student, count };
}

function getAllPending() {
  const list = [];
  students.forEach(s => {
    s.history.forEach(h => {
      if (h.status === 'pending') {
        list.push({
          studentId: s.id, studentName: s.name, studentClass: s.class,
          studentType: s.type,
          historyId: h.id, date: h.date, type: h.type, reason: h.reason, status: h.status
        });
      }
    });
  });
  return list.sort((a, b) => b.date.localeCompare(a.date));
}

function getAllReviewed() {
  const list = [];
  students.forEach(s => {
    s.history.forEach(h => {
      if (h.status !== 'pending') {
        list.push({
          studentId: s.id, studentName: s.name, studentClass: s.class,
          studentType: s.type,
          historyId: h.id, date: h.date, type: h.type, reason: h.reason, status: h.status
        });
      }
    });
  });
  return list.sort((a, b) => b.date.localeCompare(a.date));
}

function resetToDefault() {
  students = [
    { 
      id: 's1', name: '张明', class: '三年级1班', type: 'boarding', leaveCount: 2, lastLeave: '2025-03-10', reason: '感冒', 
      history: [
        { id: 'h1', date: '2025-03-08', type: 'new', reason: '感冒', status: 'approved' },
        { id: 'h2', date: '2025-03-10', type: 'extend', reason: '感冒未愈', status: 'approved' }
      ]
    },
    { id: 's2', name: '李丽', class: '三年级1班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] },
    { 
      id: 's3', name: '王浩', class: '三年级2班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-12', reason: '家事', 
      history: [{ id: 'h3', date: '2025-03-12', type: 'new', reason: '家事', status: 'pending' }]
    },
    { 
      id: 's4', name: '陈静', class: '三年级1班', type: 'day', leaveCount: 3, lastLeave: '2025-03-14', reason: '病假', 
      history: [
        { id: 'h4', date: '2025-03-09', type: 'new', reason: '病假', status: 'approved' },
        { id: 'h5', date: '2025-03-11', type: 'extend', reason: '病假未愈', status: 'approved' },
        { id: 'h6', date: '2025-03-14', type: 'extend', reason: '病假', status: 'approved' }
      ]
    },
    { id: 's5', name: '赵岩', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] },
    { 
      id: 's6', name: '周婷', class: '三年级1班', type: 'boarding', leaveCount: 1, lastLeave: '2025-03-09', reason: '事假', 
      history: [{ id: 'h7', date: '2025-03-09', type: 'new', reason: '事假', status: 'pending' }]
    },
    { id: 's7', name: '吴迪', class: '三年级2班', type: 'day', leaveCount: 0, lastLeave: '', reason: '', history: [] }
  ];
  idCounter = 100;
  historyIdCounter = 100;
  return students;
}

function getStats(className, type) {
  let filtered = getStudentsByClass(className);
  if (type && type !== 'all') filtered = filtered.filter(s => s.type === type);
  
  const totalStudents = filtered.length;
  const totalLeaves = filtered.reduce((sum, s) => sum + s.leaveCount, 0);
  const boardingCount = students.filter(s => s.type === 'boarding').length;
  const dayCount = students.filter(s => s.type === 'day').length;
  
  let topStudent = '—';
  let maxCount = -1;
  filtered.forEach(s => {
    if (s.leaveCount > maxCount) { maxCount = s.leaveCount; topStudent = s.name; }
  });
  if (maxCount <= 0) topStudent = '—';

  const fullAttendance = filtered.filter(s => s.leaveCount === 0).length;
  const avgLeaves = totalStudents > 0 ? (totalLeaves / totalStudents).toFixed(2) : 0;
  const pendingCount = filtered.reduce((sum, s) => 
    sum + s.history.filter(h => h.status === 'pending').length, 0);

  return { 
    totalStudents, totalLeaves, topStudent, fullAttendance, avgLeaves, pendingCount,
    boardingCount, dayCount
  };
}

module.exports = {
  getAllStudents, findStudentById, getStudentsByClass, getStudentsByType, getClasses,
  updateStudentLeave, addStudent, deleteStudent, updateStudentInfo,
  resetStudentLeaves, resetToDefault, getStats,
  getHistory, addHistory, updateHistory, deleteHistory,
  reviewHistory, reviewAllPending, getAllPending, getAllReviewed
};