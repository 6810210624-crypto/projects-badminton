import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: "⚡",
      title: "จัดส่งรวดเร็ว",
      desc: "ส่งถึงหน้าบ้านคุณภายใน 1-2 วันทำการ",
      color:
        "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/20",
    },
    {
      icon: "🛡️",
      title: "ของแท้ 100%",
      desc: "รับประกันสินค้าคุณภาพแท้จากโรงงาน",
      color:
        "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/20",
    },
    {
      icon: "💬",
      title: "บริการให้คำแนะนำ",
      desc: "ปรึกษาผู้เชี่ยวชาญได้ตลอดเวลา",
      color:
        "from-indigo-500/10 to-purple-500/10 text-indigo-500 border-indigo-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#070c1b] shadow-2xl">

          {/* Background Glow */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px]" />

          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 px-7 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">

            <div className="grid lg:grid-cols-[1fr_430px] gap-10 lg:gap-14 items-center">

              {/* ================= LEFT ================= */}
              <div className="max-w-2xl">

                {/* Small Label */}
                <div className="flex items-center gap-3 mb-6">

                  <span className="h-px w-8 bg-blue-500" />

                  <span className="text-blue-400 text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase">
                    Premium Badminton Equipment
                  </span>

                </div>


                {/* Main Heading */}
                <h1 className="text-[40px] sm:text-[50px] lg:text-[58px] font-bold tracking-[-0.035em] leading-[1.08] text-white">

                  <span className="block">
                    ศูนย์รวมอุปกรณ์
                  </span>

                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    แบดมินตันคุณภาพ
                  </span>

                  <span className="block text-white/90">
                    สำหรับคนที่จริงจังกับเกม
                  </span>

                </h1>


                {/* Description */}
                <p className="mt-6 max-w-xl text-sm sm:text-[15px] leading-7 text-slate-400">

                  เลือกสรรไม้แบด ลูกขนไก่ และรองเท้าจากแบรนด์ชั้นนำ
                  เพื่อยกระดับการเล่นของคุณในทุกแมตช์

                </p>


                {/* CTA */}
                <div className="mt-8">

                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-4 px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-sm shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1"
                  >

                    <span>
                      เลือกชมสินค้าทั้งหมด
                    </span>

                    <span className="w-9 h-9 rounded-xl bg-[#080d1c] text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      →
                    </span>

                  </Link>

                </div>


                {/* Mini Stats */}
                <div className="mt-9 flex items-center gap-0">

                  <div className="pr-7">
                    <div className="text-lg font-bold text-white">
                      100%
                    </div>

                    <div className="mt-1 text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                      Quality
                    </div>
                  </div>


                  <div className="h-8 w-px bg-white/10" />


                  <div className="px-7">
                    <div className="text-lg font-bold text-white">
                      Fast
                    </div>

                    <div className="mt-1 text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                      Delivery
                    </div>
                  </div>


                  <div className="h-8 w-px bg-white/10" />


                  <div className="pl-7">
                    <div className="text-lg font-bold text-white">
                      Pro
                    </div>

                    <div className="mt-1 text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                      Service
                    </div>
                  </div>

                </div>

              </div>


              {/* ================= RIGHT : BADMINTON VISUAL ================= */}
              <div className="hidden lg:flex relative h-[390px] items-center justify-center">

                {/* Glow */}
                <div className="absolute w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />


                {/* Large Rings */}
                <div className="absolute w-[300px] h-[300px] rounded-full border border-blue-400/[0.08]" />

                <div className="absolute w-[250px] h-[250px] rounded-full border border-cyan-400/[0.08]" />

                <div className="absolute w-[200px] h-[200px] rounded-full border border-indigo-400/[0.08]" />


                {/* Racket */}
                <div className="relative w-[260px] h-[340px] rotate-[25deg]">

                  {/* Racket Head */}
                  <div className="absolute top-0 left-[65px] w-[145px] h-[190px] rounded-[50%] border-[7px] border-slate-300/90 shadow-[0_0_35px_rgba(59,130,246,0.18)]">

                    {/* Inner Racket */}
                    <div className="absolute inset-[14px] rounded-[50%] border border-blue-300/20" />

                    <div className="absolute inset-[30px] rounded-[50%] border border-white/5" />

                  </div>


                  {/* Racket Neck */}
                  <div className="absolute top-[175px] left-[124px] w-[12px] h-[85px] rounded-full bg-gradient-to-b from-slate-300 to-blue-400" />


                  {/* Racket Handle */}
                  <div className="absolute top-[245px] left-[114px] w-[30px] h-[105px] rounded-b-[16px] bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-xl">

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[22px] h-[45px] rounded-b-xl bg-slate-950" />

                  </div>


                  {/* Grip highlight */}
                  <div className="absolute top-[275px] left-[119px] w-[20px] h-[55px] opacity-30 bg-gradient-to-b from-blue-400 to-transparent rounded-full" />

                </div>


                {/* Shuttlecock */}
                <div className="absolute top-2 right-5 rotate-[-18deg]">

                  <div className="relative">

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-16 bg-slate-200/90 rotate-[-20deg] rounded-sm" />

                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-slate-300 shadow-lg" />

                  </div>

                </div>


                {/* Floating Label */}
                <div className="absolute bottom-5 right-0 px-5 py-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10">

                  <div className="text-[8px] font-bold tracking-[0.18em] text-blue-400">
                    BADMINTON
                  </div>

                  <div className="mt-1 text-xs font-bold text-white">
                    PLAY LIKE A PRO
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">

          <div>

            <p className="text-[9px] font-bold tracking-[0.25em] text-blue-600 uppercase">
              Why Choose Us
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-slate-900">
              บริการที่คุณมั่นใจได้
            </h2>

          </div>

          <span className="text-[10px] text-slate-400">
            Simple • Fast • Reliable
          </span>

        </div>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {features.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/70 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50"
            >

              {/* Top Accent */}
              <div
                className={`absolute top-0 left-8 right-8 h-1 rounded-b-full ${
                  index === 0
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : index === 1
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                    : "bg-gradient-to-r from-indigo-500 to-purple-400"
                }`}
              />


              <div className="flex items-start gap-4">

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} border flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}
                >
                  {item.icon}
                </div>


                {/* Text */}
                <div>

                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-6 text-slate-400">
                    {item.desc}
                  </p>

                </div>

              </div>


              {/* Bottom Line */}
              <div className="mt-6 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

              <div className="mt-3 flex items-center gap-2 text-[9px] font-bold tracking-wider text-slate-400">

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                TRUSTED SERVICE

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-[#080d1c] shadow-2xl">

          <div className="absolute -left-20 -bottom-32 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="absolute -right-20 -top-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-7 sm:px-10 py-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div>

                <p className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  Badminton Store
                </p>

                <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white">
                  พร้อมยกระดับเกมของคุณแล้วหรือยัง?
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-400">
                  เลือกอุปกรณ์ที่เหมาะกับสไตล์การเล่นของคุณ
                </p>

              </div>


              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 shrink-0"
              >
                ดูสินค้าทั้งหมด
                <span>→</span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}