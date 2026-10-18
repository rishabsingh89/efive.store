import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Building2,
  Coffee,
  ArrowRight,
  Play,
  PenTool,
  ShieldCheck,
  Clock,
  Headphones,
} from 'lucide-react';
import { openWhatsAppInteriorInquiry } from '../whatsapp';

export default function InteriorSection() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'apartment',
      name: 'Apartment Interior',
      image: '/images/card_apartment_lux.jpg',
      description:
        'Turn your apartment into a sanctuary with bespoke designs and space-saving solutions.',
      icon: Home,
      bullets: ['Bespoke Living', 'Modular Kitchen', 'Custom Wardrobes'],
      targetCat: 'apartment',
    },
    {
      id: 'office',
      name: 'Office Interior',
      image: '/images/card_office_lux.jpg',
      description:
        'Boost productivity with modern, functional and elegant workspaces for your team.',
      icon: Building2,
      bullets: ['Ergonomic Desking', 'Executive Cabins', 'Collaboration Hubs'],
      targetCat: 'office',
    },
    {
      id: 'cafe-restaurant',
      name: 'Cafe Restaurant Interior',
      image: '/images/card_cafe_lux.jpg',
      description:
        'Create unforgettable dining experiences with unique themes and mood lighting.',
      icon: Coffee,
      bullets: ['Theme Lighting', 'Space Optimizing', 'Bar & Counter Designs'],
      targetCat: 'cafe',
    },
  ];

  const trustItems = [
    {
      icon: PenTool,
      title: 'Custom Designs',
      desc: 'Tailored to your lifestyle',
    },
    {
      icon: ShieldCheck,
      title: 'Premium Materials',
      desc: 'Quality that lasts',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      desc: 'Hassle-free experience',
    },
    {
      icon: Headphones,
      title: 'End-to-End Support',
      desc: 'From concept to completion',
    },
  ];

  const handleCardClick = (targetCat) => {
    navigate('/calculate-cost', { state: { category: targetCat } });
  };

  const scrollToServices = () => {
    const el = document.getElementById('lux-services-dock');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="lux-interiors-wrapper">
      {/* ─── Hero Section with Rich Terracotta Architectural Background ─── */}
      <div className="lux-hero-banner">
        <div className="lux-hero-bg-overlay" />

        {/* Top Floating "Get a Quote" Button */}
        <div className="lux-hero-top-bar">
          <button
            onClick={() => openWhatsAppInteriorInquiry('Luxury Interior Consultation')}
            className="lux-quote-pill-btn"
          >
            <span>Get a Quote</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Hero Left Content & Arch Calligraphy */}
        <div className="lux-hero-content-row">
          <div className="lux-hero-text-col">
            <span className="lux-hero-badge">LUXURY INTERIOR SOLUTIONS</span>
            <h2 className="lux-hero-title">
              Inspired<br />
              Interiors<br />
              for Every Space
            </h2>
            <p className="lux-hero-sub">
              From cozy homes to dynamic workplaces and vibrant cafes,
              we craft interiors that reflect your vision, lifestyle, and soul.
            </p>

            <div className="lux-hero-cta-group">
              <button onClick={scrollToServices} className="lux-cta-primary-btn">
                <span>Explore Our Services</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => openWhatsAppInteriorInquiry('Watch Our Story & Portfolio Inquiry')}
                className="lux-story-btn"
              >
                <div className="lux-play-circle">
                  <Play size={14} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 2 }} />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>
          </div>

          {/* Right Arch Cursive Script Accent */}
          <div className="lux-arch-script-wrapper">
            <span className="lux-cursive-accent">Interiors with a Soul</span>
          </div>
        </div>

        {/* ─── 3 Floating Horizontal Cards Dock ─── */}
        <div id="lux-services-dock" className="lux-cards-dock">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.targetCat)}
                className="lux-service-card"
                role="button"
                tabIndex={0}
              >
                {/* Image Section */}
                <div className="lux-card-img-box">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="lux-card-img"
                  />
                  <div className="lux-card-img-gradient" />
                  
                  {/* Floating White Icon Box on top-left of image */}
                  <div className="lux-card-icon-box">
                    <Icon size={18} color="#1E1D1B" strokeWidth={2.4} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lux-card-body">
                  <div className="lux-card-header-row">
                    <h3 className="lux-card-title">{service.name}</h3>
                    {/* Floating circular arrow button */}
                    <div className="lux-circle-arrow-btn">
                      <ArrowRight size={15} color="#1E1D1B" strokeWidth={2.4} />
                    </div>
                  </div>

                  <p className="lux-card-desc">{service.description}</p>

                  {/* Pills / Tags */}
                  <div className="lux-card-tags">
                    {service.bullets.map((bullet) => (
                      <span key={bullet} className="lux-tag-pill">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Bottom Trust & Value Bar with Terracotta Wave Card ─── */}
      <div className="lux-trust-banner-container">
        <div className="lux-trust-banner">
          {/* Left: 4 Trust Value Props */}
          <div className="lux-trust-items-grid">
            {trustItems.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="lux-trust-item">
                  <div className="lux-trust-icon-box">
                    <ItemIcon size={19} color="#8F3C12" strokeWidth={2} />
                  </div>
                  <div className="lux-trust-text">
                    <h4 className="lux-trust-title">{item.title}</h4>
                    <p className="lux-trust-desc">{item.desc}</p>
                  </div>
                  {idx < trustItems.length - 1 && <div className="lux-trust-divider" />}
                </div>
              );
            })}
          </div>

          {/* Right: Terracotta Wave Banner Card */}
          <div className="lux-contact-wave-card">
            <div className="lux-wave-content">
              <span className="lux-wave-title">Let's Create Your Dream Space</span>
              <button
                onClick={() => openWhatsAppInteriorInquiry('Dream Space Direct Inquiry')}
                className="lux-wave-btn"
              >
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Subtle decorative leaf silhouette */}
            <svg
              className="lux-leaf-bg"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 110C35 80 50 40 110 10C80 50 70 85 10 110Z"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />
              <path
                d="M30 90C45 70 55 45 90 25"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.2"
              />
              <path
                d="M45 78C60 62 75 42 105 22"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Stylesheet ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Caveat:wght@500;600;700&display=swap');

        .lux-interiors-wrapper {
          width: 100%;
          position: relative;
          background-color: #FAF8F5;
          overflow: hidden;
        }

        .lux-hero-banner {
          position: relative;
          width: 100%;
          min-height: 820px;
          background-image: url('/images/inspired_interiors_bg.jpg');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem 3.5rem 2.5rem;
        }

        .lux-hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(130, 52, 17, 0.72) 0%,
            rgba(130, 52, 17, 0.45) 42%,
            rgba(130, 52, 17, 0.15) 75%,
            rgba(0, 0, 0, 0.05) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .lux-hero-top-bar {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        .lux-quote-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #FFFFFF;
          color: #1E1D1B;
          border: none;
          border-radius: 9999px;
          padding: 10px 22px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lux-quote-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          background-color: #FDFBF7;
        }

        .lux-hero-content-row {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          margin-bottom: 2.5rem;
        }

        .lux-hero-text-col {
          max-width: 580px;
        }

        .lux-hero-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #F8EFE6;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          opacity: 0.95;
        }

        .lux-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.8rem, 4.8vw, 4.5rem);
          font-weight: 600;
          color: #FFFDF9;
          line-height: 1.08;
          letter-spacing: -0.015em;
          margin-bottom: 1.25rem;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.25);
        }

        .lux-hero-sub {
          font-family: var(--font-body);
          font-size: 0.98rem;
          color: rgba(255, 252, 248, 0.9);
          line-height: 1.65;
          margin-bottom: 2rem;
          max-width: 520px;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        }

        .lux-hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .lux-cta-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background-color: #FFFFFF;
          color: #1E1D1B;
          border: none;
          border-radius: 9999px;
          padding: 13px 28px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lux-cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
          background-color: #FAF7F2;
        }

        .lux-story-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lux-story-btn:hover {
          opacity: 0.88;
          transform: translateX(2px);
        }

        .lux-play-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .lux-story-btn:hover .lux-play-circle {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.08);
        }

        /* Archway Cursive Accent on Right */
        .lux-arch-script-wrapper {
          position: relative;
          padding-right: 3rem;
          pointer-events: none;
        }

        .lux-cursive-accent {
          font-family: 'Caveat', cursive;
          font-size: clamp(2rem, 3.2vw, 3rem);
          color: #381507;
          display: block;
          transform: rotate(-7deg);
          letter-spacing: 0.02em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
          font-weight: 700;
        }

        /* ─── 3 Floating Cards Dock ─── */
        .lux-cards-dock {
          position: relative;
          z-index: 6;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          width: 100%;
          margin-top: 1rem;
        }

        .lux-service-card {
          background: rgba(20, 16, 14, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .lux-service-card:hover {
          transform: translateY(-6px);
          background: rgba(20, 16, 14, 0.85);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
        }

        .lux-card-img-box {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .lux-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lux-service-card:hover .lux-card-img {
          transform: scale(1.05);
        }

        .lux-card-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(20, 16, 14, 0.6) 100%
          );
        }

        .lux-card-icon-box {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .lux-card-body {
          padding: 1.4rem 1.5rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .lux-card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .lux-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .lux-circle-arrow-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }
        .lux-service-card:hover .lux-circle-arrow-btn {
          transform: translateX(3px) scale(1.06);
          background-color: #FAF5EE;
        }

        .lux-card-desc {
          font-family: var(--font-body);
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        .lux-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .lux-tag-pill {
          background-color: #FFFFFF;
          color: #1E1D1B;
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 0.72rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease;
        }

        /* ─── Bottom Trust Banner ─── */
        .lux-trust-banner-container {
          width: 100%;
          padding: 1.5rem 3.5rem 2.5rem;
          background-color: #FAF8F5;
        }

        .lux-trust-banner {
          background-color: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #ECE7DE;
          box-shadow: 0 10px 30px rgba(30, 29, 27, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
        }

        .lux-trust-items-grid {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 1.25rem 2rem;
          gap: 1.5rem;
        }

        .lux-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          flex: 1;
        }

        .lux-trust-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #FAF1E8;
          border: 1px solid #ECDCCB;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lux-trust-text {
          display: flex;
          flex-direction: column;
        }

        .lux-trust-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #1E1D1B;
          margin: 0 0 2px 0;
          line-height: 1.2;
        }

        .lux-trust-desc {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #78716C;
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
        }

        .lux-trust-divider {
          position: absolute;
          right: -12px;
          top: 15%;
          height: 70%;
          width: 1px;
          background-color: #EFE9E0;
        }

        /* Right Terracotta Wave Card */
        .lux-contact-wave-card {
          position: relative;
          background: linear-gradient(135deg, #A2491F 0%, #83350F 100%);
          padding: 1.25rem 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-width: 320px;
          align-self: stretch;
          border-top-left-radius: 40px;
          border-bottom-left-radius: 40px;
        }

        .lux-wave-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .lux-wave-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        .lux-wave-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #FFFFFF;
          color: #8F3C12;
          border: none;
          border-radius: 9999px;
          padding: 6px 16px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .lux-wave-btn:hover {
          transform: translateX(2px);
          background-color: #FAF5EE;
        }

        .lux-leaf-bg {
          position: absolute;
          right: -10px;
          bottom: -15px;
          width: 90px;
          height: 90px;
          pointer-events: none;
          opacity: 0.6;
        }

        /* ── Responsive Queries ── */
        @media (max-width: 1200px) {
          .lux-hero-banner {
            padding: 2rem 2rem 2rem;
          }
          .lux-trust-banner-container {
            padding: 1rem 2rem 2rem;
          }
          .lux-cards-dock {
            gap: 1.25rem;
          }
        }

        @media (max-width: 992px) {
          .lux-cards-dock {
            grid-template-columns: 1fr;
          }
          .lux-trust-banner {
            flex-direction: column;
          }
          .lux-trust-items-grid {
            flex-wrap: wrap;
            gap: 1.25rem;
            width: 100%;
          }
          .lux-trust-divider {
            display: none;
          }
          .lux-contact-wave-card {
            width: 100%;
            border-radius: 0;
            padding: 1.5rem;
          }
          .lux-arch-script-wrapper {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .lux-hero-banner {
            padding: 1.5rem 1.25rem;
          }
          .lux-hero-title {
            font-size: 2.4rem;
          }
          .lux-trust-banner-container {
            padding: 1rem 1.25rem 2rem;
          }
          .lux-trust-items-grid {
            display: grid;
            grid-template-columns: 1fr;
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
