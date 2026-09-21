import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';

export default function GenericPage({ dataMap, basePath, categoryName }) {
  const { slug } = useParams();
  const data = dataMap[slug];

  if (!data) {
    return (
      <>
        <Navbar />
        <SEO title="Page Not Found" description="This page does not exist." path={`/${basePath}/${slug}`} />
        <div style={styles.notFound}>
          <h1 style={styles.notFoundTitle}>Page Not Found</h1>
          <p style={styles.notFoundText}>Sorry, this page doesn't exist.</p>
          <Link to="/" style={styles.backBtn}>← Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SEO title={data.title} description={data.description} path={`/${basePath}/${slug}`} />
      
      <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={styles.main}>
          {/* Hero Section */}
          <section style={styles.heroSection}>
            <div className="container">
              <span style={styles.breadcrumb}>
                <Link to="/" style={styles.breadcrumbLink}>Home</Link> / <Link to={`/${basePath}`} style={styles.breadcrumbLink}>{categoryName}</Link> / {data.title}
              </span>
              <h1 style={styles.heroTitle}>{data.title}</h1>
              <div style={styles.heroDivider}></div>
              <p style={styles.heroQuote}>"{data.hero}"</p>
            </div>
          </section>

          {/* Content Sections */}
          <section style={styles.contentSection}>
            <div className="container">
              {data.sections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.contentBlock,
                    ...(index % 2 === 1 ? styles.contentBlockAlt : {})
                  }}
                  className="generic-block"
                >
                  <h2 style={styles.sectionHeading}>{section.heading}</h2>
                  <div style={styles.sectionDivider}></div>
                  <p style={styles.sectionContent}>{section.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          {data.faqs && data.faqs.length > 0 && (
            <section style={styles.faqSection}>
              <div className="container">
                <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
                <div style={styles.faqList}>
                  {data.faqs.map((faq, i) => (
                    <div key={i} style={styles.faqItem}>
                      <h3 style={styles.faqQuestion}>{faq.q}</h3>
                      <p style={styles.faqAnswer}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section style={styles.ctaSection}>
            <div className="container" style={styles.ctaContainer}>
              <h2 style={styles.ctaTitle}>Need further assistance?</h2>
              <p style={styles.ctaText}>
                Our customer service team is always ready to help you with your queries.
              </p>
              <Link to="/contact" style={styles.ctaBtn}>Contact Us →</Link>
            </div>
          </section>
        </main>
      </div>
      
      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .generic-block {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .generic-block:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08) !important;
        }
        .generic-block p {
          white-space: pre-wrap;
        }
      `}} />
    </div>
  );
}

const styles = {
  main: {
    backgroundColor: 'hsl(var(--bg-color))',
    minHeight: '100vh',
  },
  heroSection: {
    padding: '8rem 0 4rem',
    textAlign: 'center',
  },
  breadcrumb: {
    fontSize: '0.85rem',
    color: 'hsl(var(--muted-color))',
    display: 'block',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  breadcrumbLink: {
    color: 'hsl(var(--primary-color))',
    textDecoration: 'none',
    fontWeight: 600,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900,
    color: '#000',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '-0.03em',
  },
  heroDivider: {
    width: '80px',
    height: '4px',
    backgroundColor: 'hsl(var(--primary-color))',
    margin: '0 auto 2rem',
    borderRadius: '2px',
  },
  heroQuote: {
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
    fontStyle: 'italic',
    color: 'hsl(var(--muted-color))',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  contentSection: {
    padding: '2rem 0 4rem',
  },
  contentBlock: {
    backgroundColor: 'hsl(var(--surface-color))',
    borderRadius: '20px',
    padding: 'clamp(2rem, 4vw, 3.5rem)',
    marginBottom: '2.5rem',
    border: '1px solid hsl(var(--border-color))',
    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentBlockAlt: {
    backgroundColor: 'rgba(72, 209, 130, 0.06)',
    border: '1px solid rgba(72, 209, 130, 0.15)',
  },
  sectionHeading: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 800,
    color: '#000',
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1.2,
  },
  sectionDivider: {
    width: '50px',
    height: '3px',
    backgroundColor: 'hsl(var(--primary-color))',
    marginBottom: '1.5rem',
    borderRadius: '2px',
  },
  sectionContent: {
    fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
    lineHeight: 1.85,
    color: '#333',
    fontWeight: 400,
    maxWidth: '100%',
  },
  faqSection: {
    padding: '2rem 0 4rem',
  },
  faqTitle: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: '3rem',
    fontFamily: 'var(--font-heading)',
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  faqItem: {
    backgroundColor: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: '12px',
    border: '1px solid hsl(var(--border-color))',
  },
  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '0.8rem',
    color: '#000',
  },
  faqAnswer: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: '4rem 0 5rem',
  },
  ctaContainer: {
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: '24px',
    padding: 'clamp(2.5rem, 5vw, 4rem)',
  },
  ctaTitle: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1.2,
  },
  ctaText: {
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    color: 'rgba(255,255,255,0.7)',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.7,
  },
  ctaBtn: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '100px',
    fontSize: '1.1rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
  },
  notFound: {
    textAlign: 'center',
    padding: '10rem 2rem',
    backgroundColor: 'hsl(var(--bg-color))',
    minHeight: '60vh',
  },
  notFoundTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    color: '#000',
    marginBottom: '1rem',
  },
  notFoundText: {
    fontSize: '1.2rem',
    color: 'hsl(var(--muted-color))',
    marginBottom: '2rem',
  },
  backBtn: {
    display: 'inline-block',
    padding: '0.8rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '100px',
    fontSize: '1rem',
    fontWeight: 600,
  },
};
