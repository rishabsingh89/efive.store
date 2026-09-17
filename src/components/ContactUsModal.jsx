import React, { useState } from 'react';
import { X } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' }, { code: '+7', country: 'RU/KZ' }, { code: '+20', country: 'EG' },
  { code: '+27', country: 'ZA' }, { code: '+31', country: 'NL' }, { code: '+32', country: 'BE' },
  { code: '+33', country: 'FR' }, { code: '+34', country: 'ES' }, { code: '+39', country: 'IT' },
  { code: '+41', country: 'CH' }, { code: '+44', country: 'UK' }, { code: '+49', country: 'DE' },
  { code: '+51', country: 'PE' }, { code: '+52', country: 'MX' }, { code: '+54', country: 'AR' },
  { code: '+55', country: 'BR' }, { code: '+56', country: 'CL' }, { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' }, { code: '+60', country: 'MY' }, { code: '+61', country: 'AU' },
  { code: '+62', country: 'ID' }, { code: '+63', country: 'PH' }, { code: '+64', country: 'NZ' },
  { code: '+65', country: 'SG' }, { code: '+66', country: 'TH' }, { code: '+81', country: 'JP' },
  { code: '+82', country: 'KR' }, { code: '+84', country: 'VN' }, { code: '+86', country: 'CN' },
  { code: '+90', country: 'TR' }, { code: '+91', country: 'IN' }, { code: '+92', country: 'PK' },
  { code: '+93', country: 'AF' }, { code: '+94', country: 'LK' }, { code: '+95', country: 'MM' },
  { code: '+98', country: 'IR' }, { code: '+212', country: 'MA' }, { code: '+213', country: 'DZ' },
  { code: '+234', country: 'NG' }, { code: '+254', country: 'KE' }, { code: '+255', country: 'TZ' },
  { code: '+351', country: 'PT' }, { code: '+353', country: 'IE' }, { code: '+358', country: 'FI' },
  { code: '+380', country: 'UA' }, { code: '+420', country: 'CZ' }, { code: '+421', country: 'SK' },
  { code: '+441', country: 'BM' }, { code: '+852', country: 'HK' }, { code: '+886', country: 'TW' },
  { code: '+966', country: 'SA' }, { code: '+971', country: 'AE' }, { code: '+972', country: 'IL' }
].sort((a, b) => parseInt(a.code.replace('+', '')) - parseInt(b.code.replace('+', '')));

export default function ContactUsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetEmail = 'efivestudio.me@gmail.com';
    const subject = encodeURIComponent(`Contact Us: Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.countryCode} ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    // Open default mail client
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Contact Us</h2>
          <button style={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Your Name"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="phone">Phone Number</label>
            <div style={styles.phoneGroup}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                style={styles.countrySelect}
              >
                {COUNTRY_CODES.map(({ code, country }) => (
                  <option key={`${country}-${code}`} value={code}>
                    {country} ({code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{...styles.input, flex: 1, minWidth: 0}}
                required
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Your Email"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              required
              placeholder="How can we help you?"
              rows={4}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Send Message
          </button>
        </form>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: '#FAF7F2',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    color: '#2C2B29',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#2C2B29',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #D1C8B8',
    backgroundColor: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #D1C8B8',
    backgroundColor: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'vertical',
  },
  submitButton: {
    marginTop: '1rem',
    padding: '0.875rem',
    backgroundColor: '#9C7A4F',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  phoneGroup: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'stretch',
    width: '100%',
  },
  countrySelect: {
    padding: '0.75rem 0.25rem 0.75rem 0.5rem',
    borderRadius: '6px',
    border: '1px solid #D1C8B8',
    backgroundColor: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    flexShrink: 0,
    width: '30%',
    maxWidth: '110px',
  }
};
