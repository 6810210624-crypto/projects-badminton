import React from 'react';

export default function About() {
  const stats = [
    { value: '100%', label: 'สินค้าของแท้', icon: '🛡️' },
    { value: '24/7', label: 'บริการลูกค้า', icon: '🎧' },
    { value: 'PostgreSQL', label: 'ฐานข้อมูลปลอดภัย', icon: '🗄️' },
    { value: 'JWT', label: 'ระบบยืนยันตัวตน', icon: '🔒' },
  ];

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

            <div className="grid lg:grid-cols-[1fr_350px] gap-10 items-center">

              {/* LEFT */}
              <div>

                <div className="flex items-center gap-3 mb-5">

                  <span className="h-px w-8 bg-blue-500"></span>

                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                    ABOUT OUR STORE
                  </span>

                </div>


                {/* Main Heading */}
                <h1 className="text-[40px] sm:text-[50px] lg:text-[56px] font-bold text-white leading-[1.08] tracking-[-0.035em]">

                  <span className="block">
                    เกี่ยวกับ
                  </span>

                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    MyStore
                  </span>

                </h1>


                <p className="mt-6 max-w-2xl text-sm sm:text-[15px] leading-7 text-slate-400">
                  เราเป็นทีมพัฒนาซอฟต์แวร์และผู้เชี่ยวชาญด้านกีฬาที่มุ่งมั่นสร้างประสบการณ์เว็บที่ยอดเยี่ยม
                  เพื่อให้นักกีฬาทุกระดับเข้าถึงอุปกรณ์แบดมินตันคุณภาพสูงได้อย่างสะดวกและเร็วที่สุด
                </p>

              </div>


              {/* RIGHT VISUAL */}
              <div className="relative hidden lg:flex justify-center">

                <div className="relative w-72 h-72 rounded-full border border-blue-500/10 flex items-center justify-center">

                  <div className="absolute inset-5 rounded-full border border-indigo-500/10"></div>

                  <div className="absolute inset-12 rounded-full border border-cyan-500/10"></div>


                  {/* Center */}
                  <div className="relative w-32 h-32 rounded-[36px] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-600/30 flex items-center justify-center rotate-3">

                    <span className="text-6xl -rotate-3">
                      🏸
                    </span>

                  </div>


                  {/* Floating Badge */}
                  <div className="absolute top-7 right-5 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[9px] font-bold tracking-wider text-blue-300">
                    PREMIUM
                  </div>


                  <div className="absolute bottom-8 left-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[9px] font-bold tracking-wider text-slate-300">
                    BADMINTON
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION / MISSION
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-6">

          <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
            Our Direction
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-slate-900">
            วิสัยทัศน์และพันธกิจ
          </h2>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* VISION */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>

            <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all"></div>

            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  🎯
                </div>

                <span className="text-[9px] font-bold tracking-[0.2em] text-blue-500">
                  VISION
                </span>

              </div>


              <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-slate-900">
                วิสัยทัศน์
              </h3>

              <p className="mt-3 text-sm text-slate-400 leading-7">
                เป็นแพลตฟอร์มการเลือกซื้ออุปกรณ์แบดมินตันที่เข้าง่าย
                น่าเชื่อถือ และตอบโจทย์ผู้ใช้งานมากที่สุด
                ด้วยเทคโนโลยีที่ทันสมัยและปลอดภัย
              </p>


              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-blue-600">

                <span className="w-6 h-px bg-blue-500"></span>

                USER FIRST

              </div>

            </div>

          </div>


          {/* MISSION */}
          <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-indigo-500 to-purple-400"></div>

            <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>

            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  💡
                </div>

                <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-500">
                  MISSION
                </span>

              </div>


              <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-slate-900">
                พันธกิจ
              </h3>

              <p className="mt-3 text-sm text-slate-400 leading-7">
                พัฒนา Web Application ที่เสถียร สวยงาม
                และนำเสนอข้อมูลสินค้าที่ถูกต้องครบถ้วนแก่ลูกค้า
                พร้อมระบบหลังบ้านที่จัดการคำสั่งซื้อได้อย่างมีประสิทธิภาพ
              </p>


              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-indigo-600">

                <span className="w-6 h-px bg-indigo-500"></span>

                SMART TECHNOLOGY

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-[#080d1c] shadow-2xl">

          {/* Glow */}
          <div className="absolute -left-20 -bottom-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

          <div className="absolute -right-20 -top-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>


          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>


          <div className="relative z-10 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-7 gap-3">

              <div>

                <p className="text-[10px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  System Overview
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-white">
                  เทคโนโลยีของระบบ
                </h2>

              </div>


              <span className="text-[10px] text-slate-500">
                SIMPLE • SECURE • RELIABLE
              </span>

            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

              {stats.map((item, index) => (

                <div
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1"
                >

                  <div className="flex items-center justify-between">

                    <div className="text-xl sm:text-2xl">
                      {item.icon}
                    </div>

                    <span className="text-[8px] font-bold text-slate-600">
                      0{index + 1}
                    </span>

                  </div>


                  <div className="mt-5 text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight break-words">
                    {item.value}
                  </div>


                  <div className="mt-1 text-[10px] sm:text-xs text-slate-400">
                    {item.label}
                  </div>


                  <div className="mt-4 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm px-8 py-8 sm:px-10">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>


          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>

              <p className="text-[9px] font-bold tracking-[0.25em] text-blue-600 uppercase">
                BADMINTON STORE
              </p>

              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.02em] text-slate-900">
                ออกแบบเพื่อคนรักแบดมินตัน
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                ประสบการณ์การเลือกซื้อที่เรียบง่าย ทันสมัย และน่าเชื่อถือ
              </p>

            </div>


            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">

              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

              SYSTEM READY

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}