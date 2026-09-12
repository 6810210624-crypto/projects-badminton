const pool = require('../db');

// GET /api/products/stats - ดึงสถิติจำนวนสินค้าแยกตามหมวดหมู่
const getProductStats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT category, COUNT(*) AS total FROM products GROUP BY category"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
};

// PUT /api/products/:id - แก้ไขข้อมูลสินค้า
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, stock, image_url } = req.body;

  // 1. ตรวจสอบข้อมูล Required: name, category, price
  if (!name || !category || price === undefined || price === null || price === '') {
    return res.status(400).json({ 
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน (name, category, price)' 
    });
  }

  // 2. ตรวจสอบ price ต้องเป็นตัวเลข
  if (isNaN(price)) {
    return res.status(400).json({ 
      message: 'price ต้องเป็นตัวเลขเท่านั้น' 
    });
  }

  try {
    const query = `
      UPDATE products 
      SET name = $1, 
          category = $2, 
          description = $3, 
          price = $4, 
          stock = COALESCE($5, 0), 
          image_url = $6
      WHERE id = $7 
      RETURNING *
    `;
    const values = [name, category, description || null, price, stock, image_url || null, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการแก้ไข' });
    }

    res.json({
      message: 'อัปเดตสินค้าสำเร็จ',
      product: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
};

module.exports = {
  getProductStats,
  updateProduct
};