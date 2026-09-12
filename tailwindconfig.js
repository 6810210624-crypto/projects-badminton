/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FACC15',
          500: '#D4AF37', // สีทองหลัก Luxury Gold
          600: '#CA8A04',
          700: '#A16207',
        },
        dark: {
          bg: '#0A0A0C',     // สีพื้นหลังเข้มพิเศษ
          card: '#121216',   // สีพื้นหลังการ์ด
          border: '#27272A'  // สีเส้นขอบมินิมอล
        }
      },
      boxShadow: {
        'gold-glow': '0 0 20px -3px rgba(212, 175, 55, 0.15)',
        'gold-glow-hover': '0 0 25px -1px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}