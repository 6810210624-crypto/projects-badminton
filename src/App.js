import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Orders from './components/Orders';
import Login from './components/Login';
import ProductChart from './components/ProductChart';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', role: '' });

  // ตรวจสอบ Token และดึงข้อมูล User ทุกครั้งที่มีการเปลี่ยน route
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      // ดึง Username
      const storedUsername = localStorage.getItem('username');
      // ดึง Role
      const storedRole = localStorage.getItem('role');

      // ตรวจสอบกรณีที่เก็บข้อมูลแบบ JSON Object ใน key 'user'
      const storedUserJSON = localStorage.getItem('user');
      let parsedUser = {};
      if (storedUserJSON) {
        try {
          parsedUser = JSON.parse(storedUserJSON);
        } catch (e) {
          console.error('Error parsing user JSON', e);
        }
      }

      setUserInfo({
        username: storedUsername || parsedUser.username || 'User',
        role: storedRole || parsedUser.role || 'user'
      });
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserInfo({ username: '', role: '' });
    alert('ออกจากระบบเรียบร้อยแล้ว');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-600 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          MyStore App
        </div>

        <div className="flex space-x-2 items-center">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            Products
          </NavLink>

          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            Orders
          </NavLink>

          {/* เมนูกราฟสถิติ (แสดงเมื่อล็อกอินแล้ว) */}
          {isLoggedIn && (
            <NavLink 
              to="/chart" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Stats
            </NavLink>
          )}

          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            About
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            Contact
          </NavLink>

          {isLoggedIn ? (
            <div className="flex items-center space-x-3 ml-2 pl-2 border-l border-gray-200">
              {/* ส่วนแสดง Username และ Badge สถานะ */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  👤 {userInfo.username}
                </span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  userInfo.role === 'admin' 
                    ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}>
                  {userInfo.role === 'admin' ? '🛡️ ADMIN' : 'USER'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navigation />
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin/add" element={<AddProduct />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/chart" element={<ProductChart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;