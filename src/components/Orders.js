import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "ไม่สามารถดึงข้อมูลคำสั่งซื้อได้";

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================================================
  // STATUS BADGE
  // =========================================================
  const getStatusBadge = (status) => {
    const statusLower = (status || "").toLowerCase();

    if (
      statusLower === "completed" ||
      statusLower === "สำเร็จ"
    ) {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Completed
        </span>
      );
    }

    if (
      statusLower === "pending" ||
      statusLower === "รอดำเนินการ"
    ) {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Pending
        </span>
      );
    }

    if (
      statusLower === "shipped" ||
      statusLower === "จัดส่งแล้ว"
    ) {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Shipped
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200 text-[11px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        {status || "Unknown"}
      </span>
    );
  };

  // =========================================================
  // COUNTS
  // =========================================================
  const pendingCount = orders.filter((order) => {
    const status = (order.status || "").toLowerCase();

    return (
      status === "pending" ||
      status === "รอดำเนินการ"
    );
  }).length;

  const completedCount = orders.filter((order) => {
    const status = (order.status || "").toLowerCase();

    return (
      status === "completed" ||
      status === "สำเร็จ"
    );
  }).length;

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mx-auto"></div>

          <p className="mt-4 text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
            Loading Orders
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================
  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] px-4 py-10">

        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-3xl bg-white border border-red-100 shadow-sm p-8">

            <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-red-500/5 blur-3xl"></div>

            <div className="relative flex items-start gap-4">

              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-xl shrink-0">
                ⚠️
              </div>

              <div>

                <h2 className="text-lg font-bold text-red-700">
                  เกิดข้อผิดพลาดในการโหลดข้อมูล
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {error}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#080d1c] shadow-2xl">

          {/* Glow */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]"></div>

          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]"></div>

          <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full bg-cyan-400/10 blur-[100px]"></div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          ></div>

          <div className="relative z-10 px-7 sm:px-12 lg:px-16 py-12">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              {/* LEFT */}
              <div className="max-w-2xl">

                <div className="flex items-center gap-3 mb-6">

                  <span className="h-px w-8 bg-blue-500"></span>

                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                    Order Management
                  </span>

                </div>


                {/* Main Heading */}
                <h1 className="text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.035em]">

                  <span className="block">
                    รายการคำสั่งซื้อ
                  </span>

                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    จัดการง่าย เป็นระบบ
                  </span>

                </h1>


                <p className="mt-6 max-w-xl text-sm sm:text-[15px] leading-7 text-slate-400">
                  ตรวจสอบและติดตามรายการคำสั่งซื้อทั้งหมด
                  ข้อมูลถูกจัดเก็บและเรียกดูจากระบบอย่างเป็นระบบ
                </p>

              </div>


              {/* RIGHT STAT */}
              <div className="shrink-0">

                <div className="min-w-[160px] rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-6 py-5">

                  <div className="flex items-center justify-between gap-8">

                    <div>

                      <div className="text-3xl font-bold text-white">
                        {orders.length}
                      </div>

                      <div className="mt-1 text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase">
                        Total Orders
                      </div>

                    </div>

                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">
                      📋
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUMMARY
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* TOTAL */}
          <div className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                  All Orders
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {orders.length}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  รายการทั้งหมด
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                🛒
              </div>

            </div>

          </div>


          {/* PENDING */}
          <div className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-amber-400 to-orange-400"></div>

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                  Pending
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-500">
                  {pendingCount}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  รอดำเนินการ
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                ⏳
              </div>

            </div>

          </div>


          {/* COMPLETED */}
          <div className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                  Completed
                </p>

                <p className="mt-3 text-3xl font-bold text-emerald-500">
                  {completedCount}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  ดำเนินการสำเร็จ
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                ✓
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ORDER HISTORY
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">

          <div>

            <p className="text-[10px] font-bold tracking-[0.25em] text-blue-600 uppercase">
              Order History
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-slate-900">
              ประวัติคำสั่งซื้อ
            </h2>

          </div>

          <div className="text-xs text-slate-400">
            {orders.length} รายการ
          </div>

        </div>


        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
                📋
              </div>

              <div>

                <h3 className="text-sm font-bold text-slate-800">
                  Order List
                </h3>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  ข้อมูลคำสั่งซื้อจากระบบ
                </p>

              </div>

            </div>


            <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">

              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>

              DATABASE CONNECTED

            </span>

          </div>


          {/* EMPTY */}
          {orders.length === 0 ? (

            <div className="py-20 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center text-3xl">
                📦
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-700">
                ยังไม่มีคำสั่งซื้อ
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                เมื่อมีคำสั่งซื้อ รายการจะแสดงที่นี่
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                {/* HEADER */}
                <thead>

                  <tr className="bg-slate-50/80 border-b border-slate-100">

                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      Order
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      Total
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      Status
                    </th>

                  </tr>

                </thead>


                {/* BODY */}
                <tbody className="divide-y divide-slate-100">

                  {orders.map((order, idx) => {

                    const orderNumber =
                      order.order_number ||
                      order.order_id ||
                      `ORD-2026-00${order.id}`;

                    const customerName =
                      order.customer_name ||
                      order.customer ||
                      "ไม่ระบุชื่อ";

                    const total = Number(
                      order.total_price ||
                      order.total ||
                      0
                    );

                    return (

                      <tr
                        key={order.id || idx}
                        className="group hover:bg-blue-50/30 transition-colors duration-200"
                      >

                        {/* ORDER */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-sm transition-colors duration-200">
                              🏸
                            </div>

                            <div>

                              <div className="font-bold text-slate-800 text-xs font-mono">
                                {orderNumber}
                              </div>

                              <div className="text-[9px] text-slate-400 mt-1">
                                Order #{idx + 1}
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* CUSTOMER */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-blue-600">
                              {customerName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <div className="font-bold text-slate-700 text-sm">
                                {customerName}
                              </div>

                              <div className="text-[9px] text-slate-400 mt-0.5">
                                Customer
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* TOTAL */}
                        <td className="px-6 py-5">

                          <div className="font-bold text-slate-900 text-base">
                            ฿{total.toLocaleString()}
                          </div>

                          <div className="text-[9px] text-slate-400 mt-1">
                            Total amount
                          </div>

                        </td>


                        {/* STATUS */}
                        <td className="px-6 py-5">
                          {getStatusBadge(order.status)}
                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          FOOTER CTA
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-[#080d1c] px-8 py-9 sm:px-12">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>

          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"></div>

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="relative z-10">

            <p className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
              BADMINTON STORE
            </p>

            <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white">
              จัดการคำสั่งซื้อได้ง่ายขึ้น
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              ระบบจัดเก็บข้อมูลคำสั่งซื้ออย่างเป็นระบบ
              และสามารถตรวจสอบย้อนหลังได้
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}