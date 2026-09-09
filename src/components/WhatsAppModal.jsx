import React, { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '../whatsapp';

export default function WhatsAppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [encodedText, setEncodedText] = useState('');

  useEffect(() => {
    const handleShowModal = (e) => {
      setEncodedText(e.detail?.text || '');
      setIsOpen(true);
    };

    window.addEventListener('show-whatsapp-modal', handleShowModal);
    return () => window.removeEventListener('show-whatsapp-modal', handleShowModal);
  }, []);

  if (!isOpen) return null;

  const handleAppClick = () => {
    // Uses api.whatsapp.com which usually forces the app
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${encodedText ? `&text=${encodedText}` : ''}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleWebClick = () => {
    // Uses web.whatsapp.com directly
    const url = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${encodedText ? `&text=${encodedText}` : ''}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={closeModal}>✕</button>
        <h3 style={styles.title}>Continue to WhatsApp</h3>
        <p style={styles.desc}>Choose how you want to open WhatsApp to connect with us.</p>
        
        <div style={styles.options}>
          <button style={{...styles.btn, ...styles.appBtn}} onClick={handleAppClick}>
            Open WhatsApp App
          </button>
          <button style={{...styles.btn, ...styles.webBtn}} onClick={handleWebClick}>
            Open WhatsApp Web
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'hsl(var(--surface-color))',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid hsl(var(--border-color))',
    position: 'relative',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#888',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#000',
  },
  desc: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '2rem',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  btn: {
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  appBtn: {
    backgroundColor: '#25D366', // WhatsApp Green
    color: '#fff',
  },
  webBtn: {
    backgroundColor: 'hsl(var(--bg-color))',
    color: '#333',
    border: '1px solid #ccc',
  }
};
