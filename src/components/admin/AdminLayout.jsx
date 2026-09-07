import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('efive_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email) => {
    const inputEmail = email.trim().toLowerCase();
    
    if (inputEmail === 'rishabsingh8953@gmail.com' || inputEmail === 'efivestudio.me@gmail.com') {
      localStorage.setItem('efive_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('efive_admin_auth');
    setIsAuthenticated(false);
  };

  if (isLoading) return <div style={styles.loading}>Loading...</div>;

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h2>Efive Studio Admin</h2>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'var(--font-body)',
  },
  header: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  main: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
  }
};
