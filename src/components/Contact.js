import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      title: 'ชื่อ-นามสกุล',
      value: 'นาย วาทิน สุคำภา',
      icon: '👤',
      bgIcon:
        'bg-blue-500/10 text-blue-600 border-blue-500/20'
    },
    {
      title: 'อีเมลติดต่อ',
      value: '6810210624@psu.ac.th',
      icon: '✉️',
      bgIcon:
        'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
    },
    {
      title: 'เบอร์โทรศัพท์',
      value: '+66 062 868 8488',
      icon: '📞',
      bgIcon:
        'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      alert(
        'ขอบคุณสำหรับการติดต่อ! เราได้รับข้อความของคุณแล้ว'
      );
    }, 1000);
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

          <div className="relative z-10 px-7 sm:px-12 lg:px-16 py-12 lg:py-14">

            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center">

              {/* LEFT */}
              <div>

                <div className="flex items-center gap-3 mb-5">

                  <span className="h-px w-8 bg-blue-500"></span>

                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.25em]">
                    GET IN TOUCH
                  </span>

                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">

                  ติดต่อ
                  <br />

                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    เรา
                  </span>

                </h1>

                <p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-400">
                  หากมีข้อสงสัยเกี่ยวกับสินค้า
                  หรือต้องการคำแนะนำเพิ่มเติม
                  สามารถติดต่อเราได้ตามช่องทางด้านล่าง
                  หรือฝากข้อความไว้ได้เลยครับ
                </p>

              </div>


              {/* RIGHT VISUAL */}
              <div className="hidden lg:flex justify-center">

                <div className="relative w-64 h-64 rounded-full border border-blue-500/10 flex items-center justify-center">

                  <div className="absolute inset-5 rounded-full border border-indigo-500/10"></div>

                  <div className="absolute inset-12 rounded-full border border-cyan-500/10"></div>

                  <div className="w-32 h-32 rounded-[36px] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-600/30 flex items-center justify-center rotate-3">

                    <span className="text-6xl -rotate-3">
                      💬
                    </span>

                  </div>

                  <div className="absolute top-5 right-1 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[9px] font-bold tracking-wider text-blue-300">
                    SUPPORT
                  </div>

                  <div className="absolute bottom-7 left-0 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[9px] font-bold tracking-wider text-slate-300">
                    24 / 7
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


          {/* =================================================
              CONTACT INFO
          ================================================== */}
          <div className="lg:col-span-5">

            <div className="mb-6">

              <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
                Contact Information
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                ช่องทางการติดต่อ
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-6">
                สามารถติดต่อสอบถามข้อมูลเพิ่มเติม
                ผ่านช่องทางที่สะดวกได้เลย
              </p>

            </div>


            <div className="space-y-4">

              {contactInfo.map((info, idx) => (

                <div
                  key={idx}
                  className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/70 shadow-sm p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30"
                >

                  {/* Accent */}
                  <div
                    className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${
                      idx === 0
                        ? 'bg-blue-500'
                        : idx === 1
                        ? 'bg-indigo-500'
                        : 'bg-emerald-500'
                    }`}
                  ></div>


                  <div className="flex items-center gap-4">

                    <div
                      className={`w-14 h-14 rounded-2xl ${info.bgIcon} border flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {info.icon}
                    </div>


                    <div className="min-w-0">

                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        {info.title}
                      </span>

                      <div className="mt-1 text-sm sm:text-base font-extrabold text-slate-800 tracking-tight truncate">
                        {info.value}
                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* Small Trust Card */}
            <div className="mt-4 rounded-3xl bg-[#080d1c] p-6 relative overflow-hidden">

              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl"></div>

              <div className="relative flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  🏸
                </div>

                <div>

                  <p className="text-sm font-bold text-white">
                    Badminton Store
                  </p>

                  <p className="text-[10px] text-slate-500 mt-1">
                    พร้อมให้คำแนะนำเกี่ยวกับอุปกรณ์แบดมินตัน
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================== */}
          <div className="lg:col-span-7">

            <div className="relative bg-white rounded-[32px] border border-slate-200/70 shadow-xl shadow-slate-200/40 overflow-hidden">

              {/* Top Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

              <div className="p-7 sm:p-10">

                {/* Form Header */}
                <div className="flex items-start justify-between gap-4 mb-8">

                  <div>

                    <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
                      Send Message
                    </p>

                    <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      ส่งข้อความถึงเรา
                    </h2>

                    <p className="mt-2 text-xs text-slate-400">
                      กรอกข้อมูลเพื่อฝากข้อความไว้
                      แล้วเราจะติดต่อกลับโดยเร็วที่สุด
                    </p>

                  </div>


                  <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 items-center justify-center text-xl">
                    ✉️
                  </div>

                </div>


                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div>

                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        ชื่อผู้ติดต่อ
                        <span className="text-blue-500 ml-1">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                          👤
                        </span>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="ระบุชื่อของคุณ"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL */}
                    <div>

                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        อีเมล
                        <span className="text-blue-500 ml-1">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                          ✉️
                        </span>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                          required
                        />

                      </div>

                    </div>

                  </div>


                  {/* MESSAGE */}
                  <div>

                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      ข้อความ
                      <span className="text-blue-500 ml-1">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-4 text-sm">
                        💬
                      </span>

                      <textarea
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="พิมพ์ข้อความที่คุณต้องการสอบถาม..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                        required
                      ></textarea>

                    </div>

                  </div>


                  {/* BUTTON */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <p className="text-[10px] text-slate-400">
                      * กรุณากรอกข้อมูลให้ครบทุกช่อง
                    </p>

                    <button
                      type="submit"
                      disabled={submitted}
                      className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                      {submitted ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          กำลังส่งข้อความ...
                        </>
                      ) : (
                        <>
                          <span>✉️</span>
                          ส่งข้อความ
                        </>
                      )}

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-[#080d1c] px-8 py-8 sm:px-10">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl"></div>

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <p className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                CUSTOMER SUPPORT
              </p>

              <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                พร้อมให้คำแนะนำเกี่ยวกับแบดมินตัน
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                สอบถามข้อมูลสินค้าและรายละเอียดเพิ่มเติมได้
              </p>

            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">

              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

              ONLINE SUPPORT

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}