import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้จาก localStorage
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    // ล้างข้อมูลเมื่อกด Logout
    localStorage.clear();
    alert('ออกจากระบบแล้ว');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#111',
      borderBottom: '1px solid #333',
      color: '#fff'
    }}>
      {/* โลโก้/ชื่อร้าน */}
      <h2 style={{ color: '#d4af37', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
        MyStore App
      </h2>

      {/* ส่วนแสดงสถานะผู้ใช้ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {username ? (
          <>
            {/* แสดงชื่อผู้ใช้และ Badge สถานะ */}
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#fff' }}>
                👤 {username}
              </span>
              <span style={{
                marginLeft: '10px',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: role === 'admin' ? '#d4af37' : '#4a5568',
                color: role === 'admin' ? '#000' : '#fff'
              }}>
                {role === 'admin' ? '🛡️ ADMIN' : 'USER'}
              </span>
            </div>

            {/* ปุ่ม Logout */}
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* ถ้ายังไม่ได้ล็อกอิน ให้ขึ้นปุ่ม Login */
          <button 
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#d4af37',
              color: '#000',
              border: 'none',
              padding: '6px 15px',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;