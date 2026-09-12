import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Badminton',
    price: '',
    stock: '',
    description: '',
    image_url: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 1. ดึงข้อมูลสินค้าชิ้นที่จะแก้ไขมาจาก Database
  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => {
        const product = res.data;
        setFormData({
          name: product.name || '',
          category: product.category || 'Badminton',
          price: product.price || '',
          stock: product.stock || '',
          description: product.description || '',
          image_url: product.image_url || ''
        });

        // แสดงรูปเดิมใน Preview (ถ้ามี)
        if (product.image_url) {
          const fullImgUrl = product.image_url.startsWith('http') 
            ? product.image_url 
            : `${api.defaults.baseURL || 'http://localhost:5000'}${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`;
          setPreviewUrl(fullImgUrl);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError('ไม่พบข้อมูลสินค้าชิ้นนี้');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      let imageUrl = formData.image_url;

      // 2. ถ้าผู้ใช้มีการเลือกไฟล์รูปใหม่ ให้อัปโหลดรูปก่อน
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('image', selectedFile);

        const uploadRes = await api.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      // 3. ส่งข้อมูลที่แก้ไขยิง PUT ไปบันทึกลง Database
      await api.put(`/api/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        image_url: imageUrl
      });

      alert('แก้ไขข้อมูลสินค้าสำเร็จ!');
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไขสินค้า');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
      >
        ← กลับไปหน้าสินค้าทั้งหมด
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-10 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">✏️ แก้ไขสินค้า</h1>
          <p className="text-sm text-gray-400 mt-1">อัปเดตข้อมูลและรูปภาพสินค้าในระบบ</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">ชื่อสินค้า *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">หมวดหมู่</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm bg-white"
              >
                <option value="Badminton">Badminton</option>
                <option value="Equipment">Equipment</option>
                <option value="Footwear">Footwear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">ราคา (บาท) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">จำนวนในคลัง</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">รายละเอียดสินค้า</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">เปลี่ยนรูปภาพสินค้า (ถ้าต้องการ)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
            {previewUrl && (
              <div className="mt-3 relative w-32 h-32 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'กำลังบันทึกข้อมูล...' : '💾 บันทึกการแก้ไข'}
          </button>
        </form>
      </div>
    </div>
  );
}