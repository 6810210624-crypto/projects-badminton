const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",       // Username ที่ดูจาก pgAdmin
  host: "localhost",
  database: "librarydb",  // ชื่อฐานข้อมูลที่คุณใช้อยู่
  password: "6810210624", // รหัสผ่านเข้าใช้งาน pgAdmin ของคุณ
  port: 5432,             // Port ปกติของ PostgreSQL
});

module.exports = pool;