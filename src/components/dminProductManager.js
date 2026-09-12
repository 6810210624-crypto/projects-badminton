import React, { useState, useEffect } from 'react';
import api from '../api';

export default function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // กำหนด Header สำหรับการยืนยันสิทธิ์ Admin
  const adminConfig = {
    headers: { 'x-role': 'admin' }
  };

  // ดึงรายการสินค้าทั้งหมด
  const fetchProducts = () => {
    api.get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // จัดการการเปลี่ยนค่าในอินพุต
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // สลับไปโหมดแก้ไข
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description || '',
      image_url: item.image_url || ''
    });
  };

  // ยกเลิกการแก้ไข
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', description: '', image_url: '' });
  };

  // บันทึกการเพิ่มหรือแก้ไขสินค้า
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // PUT (Update)
      api.put(`/api/products/${editingId}`, formData, adminConfig)
        .then(() => {
          setMessage('อัปเดตข้อมูลสินค้าสำเร็จ!');
          handleCancelEdit();
          fetchProducts();
        })
        .catch((err) => setMessage('เกิดข้อผิดพลาดในการแก้ไข (ต้องใช้สิทธิ์ Admin)'));
    } else {
      // POST (Create)
      api.post('/api/products', formData, adminConfig)
        .then(() => {
          setMessage('เพิ่มสินค้าสำเร็จ!');
          handleCancelEdit();
          fetchProducts();
        })
        .catch((err) => setMessage('เกิดข้อผิดพลาดในการเพิ่มสินค้า (ต้องใช้สิทธิ์ Admin)'));
    }
  };

  // DELETE - ลบสินค้า
  const handleDelete = (id) => {
    if (window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      api.delete(`/api/products/${id}`, adminConfig)
        .then(() => {
          setMessage('ลบสินค้าเรียบร้อยแล้ว');
          fetchProducts();
        })
        .catch((err) => setMessage('เกิดข้อผิดพลาดในการลบสินค้า (ต้องใช้สิทธิ์ Admin)'));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-extrabold text-gray-800">จัดการสินค้าอุปกรณ์แบดมินตัน (Admin Only)</h1>

      {message && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm">
          {message}
        </div>
      )}

      {/* ฟอร์มเพิ่ม/แก้ไขสินค้า */}
      <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-700">
          {editingId ? '✏️ แก้ไขรายการสินค้า' : '➕ เพิ่มสินค้าใหม่'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="ชื่อสินค้า (เช่น ไม้แบดมินตัน / ลูกขนไก่)"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="ราคา (บาท)"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="image_url"
            placeholder="ชื่อไฟล์รูปภาพ (เช่น racket.jpeg)"
            value={formData.image_url}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="รายละเอียดสินค้า"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>

      {/* ตารางแสดงรายการสินค้าและปุ่มจัดการ */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="p-4">รูปภาพ</th>
              <th className="p-4">ชื่อสินค้า</th>
              <th className="p-4">ราคา</th>
              <th className="p-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={`${api.defaults.baseURL}/images/${item.image_url || 'racket.jpeg'}`}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                  />
                </td>
                <td className="p-4 font-bold text-gray-800">{item.name}</td>
                <td className="p-4 text-emerald-600 font-semibold">{Number(item.price).toLocaleString()} บาท</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}