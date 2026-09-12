import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// =====================================================
// Register Chart.js Modules
// =====================================================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


// =====================================================
// สีกราฟ
// =====================================================

const BG_COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#2ECC71",
];

const BORDER_COLORS = [
  "#E04867",
  "#2B8BD1",
  "#E5B53C",
  "#35A5A5",
  "#804BDF",
  "#E08328",
  "#27AE60",
];


// =====================================================
// Bar Chart Options
// =====================================================

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: true,
      text: "จำนวนสินค้าแบ่งตามหมวดหมู่",

      font: {
        size: 16,
        weight: "bold",
        family: "'Inter', 'Prompt', sans-serif",
      },

      color: "#1F2937",

      padding: {
        bottom: 24,
      },
    },

    legend: {
      display: true,
      position: "top",

      labels: {
        font: {
          size: 12,
        },

        color: "#64748B",

        usePointStyle: true,

        boxWidth: 8,

        padding: 18,
      },
    },

    tooltip: {
      backgroundColor: "rgba(8, 13, 28, 0.95)",

      titleFont: {
        size: 13,
        weight: "bold",
      },

      bodyFont: {
        size: 12,
      },

      padding: 14,

      cornerRadius: 12,

      displayColors: true,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },

      ticks: {
        font: {
          size: 12,
          weight: "500",
        },

        color: "#64748B",
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        stepSize: 1,

        font: {
          size: 12,
        },

        color: "#94A3B8",
      },

      grid: {
        color: "#EEF2F7",
      },
    },
  },
};


// =====================================================
// Doughnut Chart Options
// =====================================================

const doughnutOptions = {
  responsive: true,

  maintainAspectRatio: false,

  cutout: "68%",

  plugins: {
    title: {
      display: true,

      text: "สัดส่วนสินค้าแต่ละหมวดหมู่",

      font: {
        size: 16,
        weight: "bold",
        family: "'Inter', 'Prompt', sans-serif",
      },

      color: "#1F2937",

      padding: {
        bottom: 18,
      },
    },

    legend: {
      display: true,

      position: "bottom",

      labels: {
        font: {
          size: 11,
        },

        color: "#64748B",

        usePointStyle: true,

        pointStyle: "circle",

        padding: 14,
      },
    },

    tooltip: {
      backgroundColor: "rgba(8, 13, 28, 0.95)",

      titleFont: {
        size: 13,
        weight: "bold",
      },

      bodyFont: {
        size: 12,
      },

      padding: 14,

      cornerRadius: 12,

      callbacks: {
        label: function (context) {
          const value = Number(context.raw || 0);

          const data =
            context.chart.data.datasets[0].data;

          const total = data.reduce(
            (sum, item) => sum + Number(item || 0),
            0
          );

          const percentage =
            total > 0
              ? ((value / total) * 100).toFixed(1)
              : 0;

          return ` ${context.label}: ${value} ชิ้น (${percentage}%)`;
        },
      },
    },
  },
};


// =====================================================
// Component
// =====================================================

export default function ProductChart() {

  const [chartData, setChartData] = useState(null);

  const [error, setError] = useState(null);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const chartRef = useRef(null);

  const navigate = useNavigate();


  // ===================================================
  // Fetch Product Statistics
  // ===================================================

  useEffect(() => {

    setError(null);

    axios
      .get(
        "http://localhost:5000/api/products/stats",
        {
          headers: {
            Authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      )

      .then((res) => {

        if (
          res.data &&
          Array.isArray(res.data)
        ) {

          // -------------------------------
          // Labels
          // -------------------------------

          const labels = res.data.map(
            (item) => item.category
          );


          // -------------------------------
          // Data
          // -------------------------------

          const data = res.data.map(
            (item) => Number(item.total)
          );


          // -------------------------------
          // Total Products
          // -------------------------------

          const sum = data.reduce(
            (acc, curr) =>
              acc + Number(curr),
            0
          );

          setTotalProducts(sum);


          // -------------------------------
          // Colors
          // -------------------------------

          const backgroundColor =
            labels.map(
              (_, index) =>
                BG_COLORS[
                  index % BG_COLORS.length
                ]
            );


          const borderColor =
            labels.map(
              (_, index) =>
                BORDER_COLORS[
                  index % BORDER_COLORS.length
                ]
            );


          // -------------------------------
          // Chart Data
          // -------------------------------

          setChartData({

            labels,

            datasets: [

              {
                label:
                  "จำนวนสินค้า (ชิ้น)",

                data,

                backgroundColor,

                borderColor,

                borderWidth: 1.5,

                borderRadius: 8,

                borderSkipped: false,
              },

            ],
          });

        }

      })

      .catch((err) => {

        console.error(
          "Error fetching stats:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "เกิดข้อผิดพลาดในการโหลดข้อมูล"
        );

      });

  }, []);


  // ===================================================
  // Click Bar Chart
  // ===================================================

  const onBarClick = (evt) => {

    const chart = chartRef.current;

    if (!chart) return;


    const points =
      chart.getElementsAtEventForMode(
        evt,
        "nearest",
        {
          intersect: true,
        },
        false
      );


    if (points.length) {

      const idx =
        points[0].index;

      const category =
        chart.data.labels[idx];


      navigate(
        `/products?category=${encodeURIComponent(
          category
        )}`
      );

    }

  };


  // ===================================================
  // Loading
  // ===================================================

  if (!chartData && !error) {

    return (

      <div className="min-h-screen bg-[#f5f7fb]">

        <div className="flex flex-col items-center justify-center min-h-[600px]">

          <div className="relative w-12 h-12 mb-5">

            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>

            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

          </div>

          <p className="text-sm font-bold text-slate-500">
            กำลังโหลดข้อมูลสถิติ...
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Connecting to product database
          </p>

        </div>

      </div>

    );

  }


  // ===================================================
  // Main UI
  // ===================================================

  return (

    <div className="min-h-screen bg-[#f5f7fb]">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#080d1c] shadow-2xl">


          {/* Glow */}

          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>

          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

          <div className="absolute top-1/2 right-1/3 w-[250px] h-[250px] bg-cyan-400/10 rounded-full blur-[100px]"></div>


          {/* Grid */}

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",

              backgroundSize:
                "45px 45px",
            }}
          ></div>


          <div className="relative z-10 px-7 sm:px-12 lg:px-16 py-10 sm:py-12">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">


              {/* Text */}

              <div className="max-w-3xl">

                <div className="flex items-center gap-3 mb-5">

                  <span className="h-px w-8 bg-blue-500"></span>

                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                    Product Analytics
                  </span>

                </div>


                <div className="flex items-center gap-3 mb-4">

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>

                    LIVE ANALYTICS

                  </span>

                </div>


                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">

                  วิเคราะห์ข้อมูลสินค้า

                  <br />

                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">

                    Product Analytics

                  </span>

                </h1>


                <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-400 leading-7">

                  ดูภาพรวมจำนวนสินค้าในแต่ละหมวดหมู่
                  พร้อมเปรียบเทียบข้อมูลด้วยกราฟแท่ง
                  และกราฟโดนัท

                </p>

              </div>


              {/* Analytics Badge */}

              <div className="hidden lg:flex relative w-48 h-48 items-center justify-center shrink-0">

                <div className="absolute inset-0 rounded-full border border-blue-500/10"></div>

                <div className="absolute inset-5 rounded-full border border-indigo-500/10"></div>

                <div className="absolute inset-10 rounded-full border border-cyan-500/10"></div>


                <div className="relative w-24 h-24 rounded-[28px] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-600/30 flex items-center justify-center rotate-3">

                  <span className="text-4xl -rotate-3">
                    📊
                  </span>

                </div>


                <div className="absolute top-1 right-0 px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[8px] font-bold tracking-wider text-blue-300">
                  DATA
                </div>


                <div className="absolute bottom-1 left-0 px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-[8px] font-bold tracking-wider text-slate-300">
                  INSIGHTS
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


          {/* Categories */}

          <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>


            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] font-bold tracking-[0.22em] text-blue-600 uppercase">
                  Categories
                </p>


                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {chartData?.labels?.length || 0}
                </p>


                <p className="mt-1 text-xs text-slate-400">
                  จำนวนหมวดหมู่สินค้า
                </p>

              </div>


              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🗂️
              </div>

            </div>


            <div className="mt-5 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>


            <div className="mt-3 text-[10px] font-bold text-blue-600">
              PRODUCT CATEGORIES
            </div>

          </div>


          {/* Total Products */}

          <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>


            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] font-bold tracking-[0.22em] text-emerald-600 uppercase">
                  Total Products
                </p>


                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalProducts}
                </p>


                <p className="mt-1 text-xs text-slate-400">
                  จำนวนสินค้าทั้งหมด
                </p>

              </div>


              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📦
              </div>

            </div>


            <div className="mt-5 h-px bg-gradient-to-r from-emerald-500/30 to-transparent"></div>


            <div className="mt-3 text-[10px] font-bold text-emerald-600">
              PRODUCTS IN DATABASE
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CHARTS
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


          {/* =================================================
              BAR CHART
          ================================================= */}

          <div className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200/70 shadow-xl shadow-slate-200/40">

            <div className="absolute top-0 left-10 right-10 h-1 rounded-b-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"></div>


            <div className="p-6 sm:p-8">


              <div className="flex items-center justify-between mb-7">

                <div>

                  <p className="text-[9px] font-bold tracking-[0.25em] text-blue-600 uppercase">
                    Bar Chart
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    จำนวนสินค้า
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    คลิกแท่งกราฟเพื่อดูสินค้า
                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  📊
                </div>

              </div>


              <div
                style={{
                  height: 390,
                }}
              >

                <Bar
                  ref={chartRef}
                  data={chartData}
                  options={barOptions}
                  onClick={onBarClick}
                />

              </div>

            </div>

          </div>


          {/* =================================================
              DOUGHNUT CHART
          ================================================= */}

          <div className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200/70 shadow-xl shadow-slate-200/40">

            <div className="absolute top-0 left-10 right-10 h-1 rounded-b-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400"></div>


            <div className="p-6 sm:p-8">


              <div className="flex items-center justify-between mb-7">

                <div>

                  <p className="text-[9px] font-bold tracking-[0.25em] text-pink-600 uppercase">
                    Doughnut Chart
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    สัดส่วนสินค้า
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    เปรียบเทียบสัดส่วนแต่ละหมวดหมู่
                  </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center">
                  🍩
                </div>

              </div>


              <div
                style={{
                  height: 390,
                }}
              >

                <Doughnut
                  data={chartData}
                  options={doughnutOptions}
                />

              </div>

            </div>

          </div>


        </div>

      </section>


      {/* =================================================
          FOOTER INFO
      ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="relative overflow-hidden rounded-3xl bg-[#080d1c] shadow-2xl">


          <div className="absolute -left-20 -bottom-32 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>

          <div className="absolute -right-20 -top-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>


          <div className="relative z-10 p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">


              <div>

                <p className="text-[9px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  Analytics Dashboard
                </p>


                <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                  ข้อมูลสินค้าแบบเรียลไทม์
                </h3>


                <p className="mt-1 text-xs text-slate-400">
                  ข้อมูลสถิติถูกดึงจากฐานข้อมูลของระบบ
                </p>

              </div>


              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">

                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                SYSTEM ONLINE

              </div>

            </div>

          </div>

        </div>

      </section>


    </div>

  );
}