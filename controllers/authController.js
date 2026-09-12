const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // เพิ่ม role ลงใน Payload ของ JWT (ขั้นตอนที่ 1)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role // <-- เพิ่มบรรทัดนี้ลงไป (อ้างอิงคอลัมน์ role ในฐานข้อมูล)
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      // ส่งข้อมูล user กลับไปให้ Frontend เก็บใช้งาน (ถ้าต้องการ)
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { login };