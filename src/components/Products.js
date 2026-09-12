import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ตรวจสอบสถานะการล็อกอิน
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const isLoggedIn = Boolean(
    token || currentUser.id || currentUser.username
  );

  // หมวดหมู่สินค้า
  const categories = [
    { id: 'All', name: 'ทั้งหมด', icon: '🏸' },
    { id: 'Badminton', name: 'ไม้แบดมินตัน', icon: '🎾' },
    { id: 'Shuttlecock', name: 'ลูกขนไก่', icon: '🪶' },
    { id: 'Footwear', name: 'รองเท้า', icon: '👟' },
    { id: 'Apparel', name: 'เสื้อผ้า', icon: '👕' },
    { id: 'Socks', name: 'ถุงเท้า', icon: '🧦' },
    { id: 'Accessories', name: 'อุปกรณ์อื่นๆ', icon: '🎒' }
  ];

  // ข้อมูลสำรอง
  const fallbackProducts = [
    {
      id: 1,
      name: 'PRO TOUCH Speed 100 ชุดไม้แบดมินตัน',
      price: 399,
      category: 'Badminton',
      image_url: 'racket.jpeg',
      tag: 'BEST SELLER',
      tagColor: 'bg-amber-500',
      description:
        'ไม้แบดมินตันเกรดพรีเมียม เฟรมคาร์บอนไฟเบอร์น้ำหนักเบาเป็นพิเศษ'
    },
    {
      id: 2,
      name: 'S SPORTS 02 ลูกขนไก่สปีด 76 (หลอด 12 ลูก)',
      price: 552,
      category: 'Shuttlecock',
      image_url: 'shuttlecock.jpeg',
      tag: 'POPULAR',
      tagColor: 'bg-blue-600',
      description:
        'ลูกขนไก่เกรดแข่งขัน ทนทาน ทิศทางวิถีแม่นยำ'
    },
    {
      id: 3,
      name: 'Yonex Power Cushion รองเท้าแบดมินตัน',
      price: 2890,
      category: 'Footwear',
      image_url: 'shoes.jpeg',
      tag: 'NEW',
      tagColor: 'bg-emerald-500',
      description:
        'รองเท้าแบดมินตันช่วยซับแรงกระแทก ยึดเกาะสนามได้ดีเยี่ยม'
    },
    {
      id: 4,
      name: 'เสื้อ กีฬาแบดมินตัน ระบายอากาศดีเยี่ยม',
      price: 350,
      category: 'Apparel',
      image_url: 'shirt.jpeg',
      tag: 'HOT',
      tagColor: 'bg-rose-500',
      description:
        'ผ้าระบายอากาศ แห้งไว ใส่สบายไม่เหนียวเหนอะหนะ'
    },
    {
      id: 5,
      name: 'ถุงเท้า กีฬาแบดมินตัน หนาพิเศษ กันลื่น',
      price: 120,
      category: 'Socks',
      image_url: 'socks.jpeg',
      tag: 'RECOMMEND',
      tagColor: 'bg-purple-500',
      description:
        'ถุงเท้าข้อสั้นผ้านุ่ม หนาพิเศษ ช่วยลดความช้ำของฝ่าเท้า'
    }
  ];

  // ดึงสินค้า
  const fetchProducts = () => {
    api
      .get('/api/products')
      .then((res) => {
        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else if (
          data &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setProducts(data.data);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch((err) => {
        console.error('Fetch products failed:', err);
        setProducts(fallbackProducts);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ลบสินค้า
  const handleDelete = (id) => {
    if (window.confirm('คุณต้องการลบสินค้ารายการนี้ใช่หรือไม่?')) {
      api
        .delete(`/api/products/${id}`)
        .then(() => {
          alert('ลบสินค้าเรียบร้อยแล้ว');
          fetchProducts();
        })
        .catch((err) =>
          alert(
            err.response?.data?.message ||
              'เกิดข้อผิดพลาดในการลบสินค้า'
          )
        );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

          <p className="mt-4 text-xs font-bold tracking-widest text-blue-600 uppercase">
            Loading Products
          </p>
        </div>
      </div>
    );
  }

  const rawProductList =
    Array.isArray(products) && products.length > 0
      ? products
      : fallbackProducts;

  // กรองหมวดหมู่
  const filteredProducts =
    selectedCategory === 'All'
      ? rawProductList
      : rawProductList.filter(
          (item) =>
            (item.category || '').toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  // รูปภาพ
  const getImageUrl = (item, defaultInfo) => {
    const imageName =
      item.image_url ||
      item.image ||
      defaultInfo.image_url;

    if (!imageName) {
      return 'https://via.placeholder.com/400';
    }

    if (
      imageName.startsWith('http://') ||
      imageName.startsWith('https://')
    ) {
      return imageName;
    }

    if (
      imageName.startsWith('/uploads') ||
      imageName.startsWith('/images')
    ) {
      return `${
        api.defaults.baseURL || 'http://localhost:5000'
      }${imageName}`;
    }

    return `${
      api.defaults.baseURL || 'http://localhost:5000'
    }/images/${imageName}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#080d1c] shadow-2xl">

          {/* Glow */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>

          <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

          <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-cyan-400/10 rounded-full blur-[100px]"></div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '45px 45px'
            }}
          ></div>

          <div className="relative z-10 min-h-[300px] flex items-center px-7 sm:px-12 lg:px-16 py-12">

            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              {/* Left */}
              <div className="max-w-2xl">

                <div className="flex items-center gap-3 mb-6">

                  <span className="h-px w-8 bg-blue-500"></span>

                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                    Premium Badminton Equipment
                  </span>

                </div>


                {/* Main Heading */}
                <h1 className="text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.035em]">

                  <span className="block">
                    อุปกรณ์แบดมินตัน
                  </span>

                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    คุณภาพสำหรับทุกเกม
                  </span>

                </h1>


                <p className="mt-6 max-w-xl text-sm sm:text-[15px] leading-7 text-slate-400">

                  คัดสรรอุปกรณ์ระดับมืออาชีพ
                  เพิ่มประสิทธิภาพทุกการตีด้วยสินค้าคุณภาพสูงเกรดพรีเมียม

                </p>

              </div>


              {/* Right */}
              <div className="flex items-center gap-4">

                {/* Product Count */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 min-w-[130px]">

                  <div className="text-3xl font-bold text-white">
                    {filteredProducts.length}
                  </div>

                  <div className="mt-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Products
                  </div>

                </div>


                {/* Admin */}
                {isLoggedIn && (
                  <Link
                    to="/admin/add"
                    className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-xs font-bold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
                  >
                    <span className="text-lg group-hover:rotate-90 transition-transform duration-300">
                      ＋
                    </span>

                    <span>
                      เพิ่มสินค้าใหม่
                    </span>
                  </Link>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <div className="flex items-end justify-between mb-5">

          <div>

            <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
              Shop By Category
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-slate-900">
              เลือกหมวดหมู่สินค้า
            </h2>

          </div>

          <div className="hidden sm:block text-xs text-slate-400">
            {filteredProducts.length} รายการ
          </div>

        </div>


        {/* Category Buttons */}
        <div className="flex gap-3 overflow-x-auto pb-3">

          {categories.map((cat) => {

            const isActive =
              selectedCategory.toLowerCase() ===
              cat.id.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(cat.id)
                }
                className={`group flex items-center gap-3 whitespace-nowrap rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 -translate-y-0.5'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5'
                }`}
              >

                <span className="text-lg group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>

                <span>
                  {cat.name}
                </span>

              </button>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">

          <div>

            <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
              Featured Collection
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-slate-900">
              สินค้าของเรา
            </h2>

          </div>

          <div className="text-xs text-slate-400">
            Showing {filteredProducts.length} items
          </div>

        </div>


        {/* Empty */}
        {filteredProducts.length === 0 ? (

          <div className="rounded-3xl bg-white border border-dashed border-slate-200 py-20 text-center">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h3 className="text-lg font-bold text-slate-700">
              ไม่พบสินค้าในหมวดหมู่นี้
            </h3>

            <p className="text-xs text-slate-400 mt-2">
              ลองเลือกหมวดหมู่อื่นดูนะครับ
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredProducts.map((item, index) => {

              const defaultInfo =
                fallbackProducts[
                  index % fallbackProducts.length
                ] || {};

              const tag =
                item.tag ||
                item.category ||
                defaultInfo.tag ||
                'HOT';

              const tagColor =
                item.tagColor ||
                defaultInfo.tagColor ||
                'bg-blue-600';

              const productId =
                item.id || index + 1;

              const imageSrc =
                getImageUrl(item, defaultInfo);

              return (

                <div
                  key={productId}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">

                    {/* Glow */}
                    <div className="absolute w-48 h-48 rounded-full bg-blue-500/5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/10 transition-all duration-500"></div>


                    {/* Image */}
                    <Link
                      to={`/products/${productId}`}
                      className="relative z-10 w-full h-full flex items-center justify-center p-8"
                    >

                      <img
                        src={imageSrc}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                    </Link>


                    {/* Badge */}
                    <span
                      className={`absolute top-5 left-5 ${tagColor} text-white text-[9px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md z-20`}
                    >
                      {tag}
                    </span>


                    {/* Quick View */}
                    <Link
                      to={`/products/${productId}`}
                      className="absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-700 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm"
                    >
                      →
                    </Link>

                  </div>


                  {/* =================================================
                      INFO
                  ================================================== */}
                  <div className="p-6">

                    {/* Category */}
                    <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-blue-500">
                      {item.category || 'Badminton'}
                    </div>


                    {/* Name */}
                    <Link
                      to={`/products/${productId}`}
                    >
                      <h3 className="mt-2 text-base font-bold text-slate-800 leading-6 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>


                    {/* Description */}
                    <p className="mt-2 text-xs text-slate-400 leading-5 line-clamp-2 min-h-[40px]">
                      {item.description ||
                        defaultInfo.description ||
                        'สินค้าคุณภาพสูง เหมาะสำหรับการเล่นแบดมินตันทุกระดับ'}
                    </p>


                    {/* Price */}
                    <div className="mt-5 pt-5 border-t border-slate-100 flex items-end justify-between">

                      <div>

                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                          ราคา
                        </div>

                        <div className="mt-1 text-2xl font-bold text-slate-900">
                          ฿
                          {Number(
                            item.price || 0
                          ).toLocaleString()}
                        </div>

                      </div>


                      {/* Detail Button */}
                      <Link
                        to={`/products/${productId}`}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-[10px] font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        ดูรายละเอียด
                        <span>→</span>
                      </Link>

                    </div>


                    {/* Admin Buttons */}
                    {isLoggedIn && (

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-dashed border-slate-200">

                        <Link
                          to={`/admin/edit/${productId}`}
                          className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-xs font-bold text-amber-600 transition-all hover:bg-amber-500 hover:text-white"
                        >
                          <span>✏️</span>
                          แก้ไข
                        </Link>


                        <button
                          onClick={() =>
                            handleDelete(productId)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-rose-50 py-2.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white cursor-pointer"
                        >
                          <span>🗑️</span>
                          ลบ
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-10 sm:px-12">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>

          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>

              <p className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                BADMINTON STORE
              </p>

              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white">
                พร้อมยกระดับการเล่นของคุณหรือยัง?
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                เลือกอุปกรณ์ที่เหมาะกับสไตล์การเล่นของคุณ
              </p>

            </div>


            <Link
              to="/products"
              className="shrink-0 inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-slate-900 transition-all hover:bg-blue-500 hover:text-white hover:-translate-y-1"
            >
              ดูสินค้าทั้งหมด
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}