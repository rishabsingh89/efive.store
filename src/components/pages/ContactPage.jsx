import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with EFIVE Studio. We're here to help with your orders and interior design needs." 
        path="/contact" 
      />
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div className="container">
            <h1 style={styles.heroTitle}>Contact Us</h1>
            <p style={styles.heroTagline}>We'd love to hear from you.</p>
          </div>
        </section>

        <section style={styles.contentSection}>
          <div className="container" style={styles.grid}>
            <div style={styles.infoCol}>
              <h2 style={styles.sectionTitle}>Get in Touch</h2>
              <p style={styles.desc}>
                Whether you have a question about a product, need design advice, or want to track an order, our team is ready to answer all your questions.
              </p>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h3 style={styles.itemTitle}>Phone</h3>
                  <p style={styles.itemText}>+91 1800-EFIVE-CARE</p>
                  <p style={styles.itemSubtext}>Mon-Sat, 9 AM - 8 PM</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}><Mail size={24} /></div>
                <div>
                  <h3 style={styles.itemTitle}>Email</h3>
                  <p style={styles.itemText}>support@efive.store</p>
                  <p style={styles.itemSubtext}>We'll respond within 24 hours.</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h3 style={styles.itemTitle}>Headquarters</h3>
                  <p style={styles.itemText}>EFIVE Studio, Design District</p>
                  <p style={styles.itemSubtext}>Bengaluru, India</p>
                </div>
              </div>
            </div>

            <div style={styles.formCol}>
              <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                <h2 style={styles.sectionTitle}>Send a Message</h2>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" style={styles.input} placeholder="John Doe" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input type="email" style={styles.input} placeholder="john@example.com" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Subject</label>
                  <select style={styles.input}>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Business Partnership</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea style={{...styles.input, minHeight: '150px'}} placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" style={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: { backgroundColor: 'hsl(var(--bg-color))', minHeight: '100vh' },
  heroSection: { padding: '8rem 0 4rem', textAlign: 'center' },
  heroTitle: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, fontFamily: 'var(--font-heading)', marginBottom: '1rem' },
  heroTagline: { fontSize: '1.2rem', color: 'hsl(var(--muted-color))' },
  contentSection: { padding: '0 0 6rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' },
  infoCol: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  sectionTitle: { fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '1rem' },
  desc: { fontSize: '1.1rem', color: '#555', lineHeight: 1.6, marginBottom: '1rem' },
  contactItem: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  iconBox: { width: '50px', height: '50px', backgroundColor: 'hsl(var(--surface-color))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--primary-color))' },
  itemTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' },
  itemText: { fontSize: '1rem', color: '#333' },
  itemSubtext: { fontSize: '0.85rem', color: '#777' },
  formCol: { backgroundColor: 'hsl(var(--surface-color))', padding: '3rem', borderRadius: '20px', border: '1px solid hsl(var(--border-color))' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.9rem', fontWeight: 600, color: '#333' },
  input: { padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', width: '100%', fontFamily: 'inherit' },
  submitBtn: { padding: '1rem', backgroundColor: 'hsl(var(--primary-color))', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', transition: 'background-color 0.3s' },
};
