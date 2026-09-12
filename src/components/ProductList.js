import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ShoppingBag
} from 'lucide-react';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [loading, setLoading] = useState(true);

  // ดึงสิทธิ์ User และ Token จาก LocalStorage
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const isAdmin = role === 'admin';

  const categories = ['ทั้งหมด', 'ไม้แบดมินตัน', 'ลูกขนไก่', 'รองเท้า', 'เสื้อผ้า', 'ถุงเท้า', 'อุปกรณ์อื่นๆ'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`คุณต้องการลบสินค้า "${name}" ใช่หรือไม่?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('ลบสินค้าเรียบร้อยแล้ว');
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'ไม่สามารถลบสินค้าได้');
    }
  };

  const filteredProducts = selectedCategory === 'ทั้งหมด'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 px-4 sm:px-8 lg:px-12 py-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ================= HERO BANNER SECTION ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-black to-zinc-950 p-8 sm:p-12 border border-amber-500/20 shadow-[0_0_50px_-12px_rgba(212,175,55,0.12)]">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/0 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Exclusive Badminton Equipment
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-200/80 tracking-tight leading-tight">
                อุปกรณ์แบดมินตันคอลเลกชันพิเศษ
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                ยกระดับประสิทธิภาพการเล่นของคุณ ด้วยอุปกรณ์ระดับพรีเมียมที่ผสานนวัตกรรมและความหรูหราอย่างลงตัว
              </p>
            </div>

            {/* Admin Control Bar / Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {isAdmin ? (
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    ADMIN PRIVILEGES ENABLED
                  </div>
                  <button
                    onClick={() => navigate('/admin/add')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    เพิ่มสินค้าใหม่เข้าสต็อก
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">สินค้าพร้อมจำหน่าย</span>
                    <span className="text-sm font-bold text-zinc-200">{filteredProducts.length} รายการ</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= CATEGORY FILTER BAR ================= */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_20px_rgba(212,175,55,0.25)] font-bold'
                    : 'bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ================= PRODUCT CARDS GRID ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
            <p className="text-xs text-amber-400/80 font-medium tracking-widest uppercase">กำลังโหลดข้อมูลสินค้าสุดหรู...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 backdrop-blur-sm space-y-3">
            <Layers className="w-12 h-12 text-zinc-600 mx-auto stroke-1" />
            <p className="text-zinc-400 font-medium">ไม่พบสินค้าในหมวดหมู่นี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-black border border-zinc-800/80 hover:border-amber-500/60 p-4 transition-all duration-500 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)] hover:-translate-y-1.5"
              >
                {/* Product Image Box */}
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-zinc-950 to-zinc-900/80 h-56 flex items-center justify-center border border-zinc-800/50">
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                      {product.category || 'Luxury'}
                    </span>

                    <img
                      src={product.image_url || '/images/default.png'}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Image Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 space-y-2 px-1">
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light">
                      {product.description || 'ไม่มีรายละเอียดเพิ่มเติม'}
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Price & Actions */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-3 px-1">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-widest">ราคาพิเศษ</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                        ฿{Number(product.price).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-amber-400 hover:text-black text-zinc-300 text-xs font-bold border border-zinc-700/60 hover:border-amber-400 transition-all duration-300 cursor-pointer group/btn"
                    >
                      ดูรายละเอียด
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Admin Controls (เฉพาะ Role Admin) */}
                  {isAdmin && (
                    <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/50">
                      <button
                        onClick={() => navigate(`/admin/edit/${product.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all duration-200 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" /> แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-400 border border-rose-800/40 text-xs font-bold transition-all duration-200 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> ลบ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;