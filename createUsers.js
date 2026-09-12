const db = require("./db");
const bcrypt = require("bcryptjs");

async function updateUserPassword() {
  const username = "alice"; // ระบุ username ที่ต้องการเปลี่ยนรหัส
  const newPassword = "6810210624"; // ใส่รหัสผ่านใหม่ตรงนี้

  // เข้ารหัส Password ใหม่ด้วย bcrypt
  const hash = await bcrypt.hash(newPassword, 10);

  // UPDATE รหัสผ่านใหม่ลงฐานข้อมูล
  const result = await db.query(
    "UPDATE users SET password = $1 WHERE username = $2",
    [hash, username]
  );

  if (result.rowCount > 0) {
    console.log(`Password updated for user: ${username}`);
  } else {
    console.log(`User ${username} not found!`);
  }

  process.exit();
}

updateUserPassword();