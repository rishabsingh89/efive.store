import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(email);
    if (!success) {
      setError('Invalid email address. Access denied.');
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Admin Login | Efive Studio</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Helmet>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <Lock size={32} color="#121212" />
        </div>
        <h2 style={styles.title}>Admin Access</h2>
        <p style={styles.subtitle}>Please enter your authorized email</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'var(--font-body)',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconWrapper: {
    backgroundColor: '#f0f0f0',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#121212',
  },
  subtitle: {
    color: '#666',
    marginBottom: '2rem',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.85rem',
    textAlign: 'left',
    marginTop: '-0.5rem',
  },
  button: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.2s',
  }
};
