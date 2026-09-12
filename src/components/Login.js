import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/api/login', formData);

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);

        localStorage.setItem(
          'user',
          JSON.stringify(
            res.data.user || {
              username: formData.username
            }
          )
        );

        alert('เข้าสู่ระบบสำเร็จ!');
        navigate('/products');
      } else {
        alert(
          res.data.message ||
          'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
        );
      }
    } catch (err) {
      console.error('Login failed:', err);

      alert(
        err.response?.data?.message ||
        'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f7fb] flex items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none"></div>


      {/* =====================================================
          LOGIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 w-full max-w-5xl">

        <div className="grid lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-slate-300/40 overflow-hidden border border-slate-200/70">


          {/* =================================================
              LEFT BRANDING
          ================================================== */}

          <div className="hidden lg:flex relative overflow-hidden bg-[#080d1c] p-12 xl:p-14 flex-col justify-between min-h-[620px]">

            {/* Glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px]"></div>

            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px]"></div>

            <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-cyan-400/10 blur-[100px]"></div>


            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '45px 45px'
              }}
            ></div>


            <div className="relative z-10">

              {/* Brand */}
              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <span className="text-xl">
                    🏸
                  </span>
                </div>

                <div>

                  <div className="text-white text-sm font-bold tracking-tight">
                    MyStore
                  </div>

                  <div className="text-[9px] text-slate-500 tracking-[0.2em] uppercase">
                    Badminton Store
                  </div>

                </div>

              </div>


              {/* Main Message */}
              <div className="mt-20">

                <div className="flex items-center gap-3 mb-5">

                  <span className="w-7 h-px bg-blue-500"></span>

                  <span className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                    Welcome Back
                  </span>

                </div>


                <h2 className="text-4xl xl:text-5xl font-bold text-white leading-[1.08] tracking-[-0.035em]">

                  ยินดีต้อนรับ
                  <br />

                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    กลับมาอีกครั้ง
                  </span>

                </h2>


                <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
                  เข้าสู่ระบบเพื่อเลือกซื้ออุปกรณ์แบดมินตัน
                  และเข้าถึงข้อมูลต่าง ๆ ภายในระบบ
                </p>

              </div>

            </div>


            {/* Bottom Info */}
            <div className="relative z-10 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                <span className="text-[9px] font-bold tracking-[0.18em] text-slate-500 uppercase">
                  Secure Access
                </span>

              </div>


              <span className="text-[9px] text-slate-600 tracking-wider">
                SIMPLE • SECURE • RELIABLE
              </span>

            </div>


            {/* Decorative Badminton */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04]">

              <div className="text-[180px] rotate-[-25deg]">
                🏸
              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT LOGIN FORM
          ================================================== */}

          <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">

            {/* Mobile Brand */}
            <div className="lg:hidden flex items-center justify-center mb-8">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">

                  <span className="text-xl">
                    🏸
                  </span>

                </div>

                <div>

                  <div className="text-sm font-bold text-slate-800">
                    MyStore
                  </div>

                  <div className="text-[9px] text-slate-400 tracking-[0.2em] uppercase">
                    Badminton Store
                  </div>

                </div>

              </div>

            </div>


            {/* Header */}
            <div className="mb-8">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg">
                  🔐
                </div>

                <div>

                  <p className="text-[9px] font-bold tracking-[0.22em] text-blue-600 uppercase">
                    Account Access
                  </p>

                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Secure authentication
                  </p>

                </div>

              </div>


              <h1 className="text-[30px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.035em] leading-tight">
                เข้าสู่ระบบ
              </h1>

              <p className="mt-2 text-sm text-slate-400 leading-6">
                กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
              </p>

            </div>


            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Username */}
              <div className="space-y-2">

                <label className="block text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase">
                  Username
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    👤
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="กรอกชื่อผู้ใช้"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />

                </div>

              </div>


              {/* Password */}
              <div className="space-y-2">

                <label className="block text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    🔑
                  </span>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />

                </div>

              </div>


              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-1">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />

                  <span className="text-xs text-slate-500">
                    จดจำฉันไว้
                  </span>

                </label>


                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      'โปรดติดต่อผู้ดูแลระบบเพื่อรีเซ็ตรหัสผ่าน'
                    );
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ลืมรหัสผ่าน?
                </a>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <span className="flex items-center justify-center gap-2">

                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                    กำลังเข้าสู่ระบบ...

                  </span>
                ) : (
                  'เข้าสู่ระบบ'
                )}

              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-slate-100"></div>

              <span className="text-[9px] font-bold tracking-[0.15em] text-slate-300 uppercase">
                New here?
              </span>

              <div className="flex-1 h-px bg-slate-100"></div>

            </div>


            {/* Register */}
            <div className="text-center">

              <p className="text-xs text-slate-400">

                ยังไม่มีบัญชีผู้ใช้?{' '}

                <Link
                  to="/register"
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ลงทะเบียน
                </Link>

              </p>

            </div>


            {/* Security Footer */}
            <div className="mt-8 flex items-center justify-center gap-2">

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>

              <span className="text-[9px] text-slate-400 tracking-[0.12em] uppercase">
                Secure & Protected
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}