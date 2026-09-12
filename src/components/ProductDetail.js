import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const fallbackDetails = {
    "1": {
      id: 1,
      name: "Badminton Racket (ไม้แบดมินตัน)",
      price: 2500,
      description: "ไม้แบดมินตันเกรดพรีเมียม เฟรมคาร์บอนไฟเบอร์น้ำหนักเบาเป็นพิเศษ ให้ความยืดหยุ่นสูง",
      image_url: "racket.jpeg",
      category: "Equipment",
      stock: 15,
      sku: "PRO-RKT-001"
    },
    "2": {
      id: 2,
      name: "Shuttlecocks (ลูกขนไก่เกรดแข่ง)",
      price: 650,
      description: "ลูกขนไก่เกรดการแข่งขัน ผลิตจากขนห่านธรรมชาติคุณภาพเยี่ยม วิถีการบินแม่นยำ",
      image_url: "shuttlecock.jpeg",
      category: "Accessory",
      stock: 42,
      sku: "PRO-SHU-002"
    },
    "3": {
      id: 3,
      name: "Badminton Shoes (รองเท้าแบดมินตัน)",
      price: 3200,
      description: "รองเท้าสำหรับเล่นกีฬาแบดมินตันโดยเฉพาะ ออกแบบมาเพื่อการซัพพอร์ตแรงกระแทก",
      image_url: "shoes.jpeg",
      category: "Footwear",
      stock: 8,
      sku: "PRO-SHO-003"
    }
  };

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => {
        if (res.data && res.data.name) {
          setProduct(res.data);
        } else {
          setProduct(fallbackDetails[id] || fallbackDetails["1"]);
        }
      })
      .catch((err) => {
        console.error('Error fetching product detail:', err);
        setProduct(fallbackDetails[id] || fallbackDetails["1"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  // ฟังก์ชันคำนวณ Path รูปภาพให้ถูกต้องเหมือนหน้า Products.js
  const getImageUrl = (item) => {
    const imageName = item?.image_url || item?.image;
    
    if (!imageName) return "https://via.placeholder.com/400";

    // 1. กรณีเป็น URL แบบสมบูรณ์ (http/https)
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }

    // 2. กรณีเป็น Path ที่ขึ้นต้นด้วย /uploads หรือ /images
    if (imageName.startsWith('/uploads') || imageName.startsWith('/images')) {
      return `${api.defaults.baseURL || 'http://localhost:5000'}${imageName}`;
    }

    // 3. กรณีเป็นชื่อไฟล์รูปเปล่าๆ
    return `${api.defaults.baseURL || 'http://localhost:5000'}/images/${imageName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentItem = product || fallbackDetails[id] || fallbackDetails["1"];
  const imageSrc = getImageUrl(currentItem);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> กลับไปหน้าสินค้าทั้งหมด
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-gray-50 flex items-center justify-center p-8 min-h-[380px] overflow-hidden group">
          <img 
            src={imageSrc} 
            alt={currentItem.name} 
            className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <span className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {currentItem.sku || `รหัสสินค้า #${id}`}
          </span>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {currentItem.category || "Badminton Gear"}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                {currentItem.name}
              </h1>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              {currentItem.description}
            </p>

            <div className="pt-2">
              <span className="text-xs font-medium text-gray-400 block uppercase tracking-wider">ราคาพิเศษ</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-emerald-600">
                  {Number(currentItem.price || 0).toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-gray-500">บาท</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">จำนวน:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-gray-800 bg-white min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">
                (คลังสินค้า: {currentItem.stock || 10} ชิ้น)
              </span>
            </div>

            {added && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium flex items-center space-x-2 animate-fade-in">
                <span>✓</span>
                <span>เพิ่มสินค้าลงในคำสั่งซื้อเรียบร้อยแล้ว!</span>
              </div>
            )}

            <button 
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span className="text-lg">🛒</span>
              <span>สั่งซื้อสินค้า / เพิ่มลงตะกร้า</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}