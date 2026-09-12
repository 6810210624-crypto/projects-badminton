const jwt = require('jsonwebtoken');

// ตรวจสอบว่ามี Token และถูกต้องหรือไม่
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // แยกคำว่า Bearer ออก

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: ไม่พบ Token กรุณาล็อกอินก่อนใช้งาน' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Token ไม่ถูกต้องหรือหมดอายุ' });
    }
    req.user = decoded; // เก็บข้อมูล user จาก token ลง req.user
    next();
  });
};

// ตรวจสอบเฉพาะผู้ที่มี role เป็น 'admin'
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access Denied: สิทธิ์เฉพาะ Admin เท่านั้น' });
  }
};

module.exports = { verifyToken, isAdmin };