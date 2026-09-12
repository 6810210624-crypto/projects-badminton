import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Badminton',
    price: '',
    stock: '',
    description: '',
    image_url: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // หมวดหมู่ให้ตรงกับหน้า Products
  const categories = [
    { id: 'Badminton', name: 'ไม้แบดมินตัน' },
    { id: 'Shuttlecock', name: 'ลูกขนไก่' },
    { id: 'Footwear', name: 'รองเท้า' },
    { id: 'Apparel', name: 'เสื้อผ้า' },
    { id: 'Socks', name: 'ถุงเท้า' },
    { id: 'Accessories', name: 'อุปกรณ์อื่นๆ' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('กรุณากรอกชื่อสินค้าและราคา');
      return;
    }

    setLoading(true);
    let uploadedImageUrl = formData.image_url;

    try {
      // อัปโหลดรูปภาพหากมีการเลือกไฟล์
      if (file) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const uploadRes = await api.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedImageUrl = uploadRes.data.imageUrl;
      }

      // บันทึกข้อมูลสินค้า
      await api.post('/api/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        image_url: uploadedImageUrl
      });

      alert('เพิ่มสินค้าสำเร็จ!');
      navigate('/products');
    } catch (err) {
      console.error('Add product error:', err);
      alert(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/products" className="text-slate-500 hover:text-slate-800 text-sm font-semibold mb-6 inline-block">
        ← กลับไปหน้าสินค้าทั้งหมด
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800">เพิ่มสินค้าใหม่</h2>
          <p className="text-xs text-slate-400 mt-1">กรอกข้อมูลและเลือกรูปภาพสินค้าสำหรับนำขึ้นระบบ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อสินค้า *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="เช่น YONEX Astrox 99 Pro"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ราคา (บาท) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2500"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">จำนวนในคลัง</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดสินค้า</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="ระบุรายละเอียดสินค้า..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">รูปภาพสินค้า</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'กำลังบันทึก...' : '➕ ยืนยันการเพิ่มสินค้า'}
          </button>
        </form>
      </div>
    </div>
  );
}