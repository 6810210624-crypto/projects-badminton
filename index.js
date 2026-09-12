const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Serve Static Files สำหรับรูปภาพสินค้า
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ตั้งค่าการเซฟไฟล์ด้วย Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware ตรวจสอบการล็อกอิน
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized: ไม่พบ Token กรุณาล็อกอินก่อนใช้งาน' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ กรุณาล็อกอินใหม่' });
  }
};

// ---------------- API ENDPOINTS ----------------

// [UPLOAD] POST /api/upload - อัปโหลดรูปภาพสินค้า (ต้อง Login)
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'กรุณาเลือกไฟล์รูปภาพ' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ message: 'อัปโหลดรูปภาพสำเร็จ', imageUrl });
});

// [AUTH] POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });

    const user = result.rows[0];
    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = user.password === password;
    }

    if (!isMatch) return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS] GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS STATS] GET /api/products/stats - ดึงข้อมูลจำนวนสินค้าแยกตามหมวดหมู่ (ต้อง Login)
app.get('/api/products/stats', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT category, COUNT(*) AS total FROM products GROUP BY category'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS] GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'ไม่พบสินค้า' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS] POST /api/products - เพิ่มสินค้า (ต้อง Login)
app.post('/api/products', authenticateToken, async (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อและราคา' });
  }

  try {
    const query = `
      INSERT INTO products (name, description, price, stock, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [
      name, 
      description || '', 
      parseFloat(price), 
      parseInt(stock) || 0, 
      category || 'General', 
      image_url || null
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS] PUT /api/products/:id - แก้ไขสินค้าลง PostgreSQL (ต้อง Login)
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อและราคา' });
  }

  try {
    const query = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, stock = $4, category = $5, image_url = COALESCE($6, image_url)
      WHERE id = $7
      RETURNING *
    `;
    const values = [
      name, 
      description || '', 
      parseFloat(price), 
      parseInt(stock) || 0, 
      category || 'General', 
      image_url || null,
      id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการแก้ไข' });
    }

    res.json({ message: 'แก้ไขสินค้าสำเร็จ', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

// [PRODUCTS] DELETE /api/products/:id - ลบสินค้า (ต้อง Login)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'ไม่พบสินค้า' });
    res.json({ message: 'ลบสินค้าสำเร็จ', deleted: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));