import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Building2,
  Coffee,
  ArrowRight,
  Play,
  Palette,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
import { openWhatsAppInteriorInquiry } from '../whatsapp';

export default function InteriorSection() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'apartment',
      category: 'apartment',
      title: 'Apartment Interior',
      desc: 'Turn your apartment into a sanctuary with bespoke designs and space-saving solutions.',
      image: '/images/card_apartment_lux.jpg',
      icon: Home,
      tags: ['Bespoke Living', 'Modular Kitchen', 'Custom Wardrobes'],
    },
    {
      id: 'office',
      category: 'office',
      title: 'Office Interior',
      desc: 'Boost productivity with modern, functional and elegant workspaces for your team.',
      image: '/images/card_office_lux.jpg',
      icon: Building2,
      tags: ['Ergonomic Desking', 'Executive Cabins', 'Collaboration Hubs'],
    },
    {
      id: 'cafe',
      category: 'cafe',
      title: 'Cafe Restaurant Interior',
      desc: 'Create unforgettable dining experiences with unique themes and mood lighting.',
      image: '/images/card_cafe_lux.jpg',
      icon: Coffee,
      tags: ['Theme Lighting', 'Space Optimizing', 'Bar & Counter Designs'],
    },
  ];

  const trustItems = [
    {
      icon: Palette,
      title: 'Custom Designs',
      desc: 'Tailored to your lifestyle',
    },
    {
      icon: ShieldCheck,
      title: 'Premium Materials',
      desc: 'Quality that lasts',
    },
    {
      icon: ShoppingBag,
      title: 'On-Time Delivery',
      desc: 'Hassle-free experience',
    },
    {
      icon: UserCheck,
      title: 'End-to-End Support',
      desc: 'From concept to completion',
    },
  ];

  const handleCardClick = (category) => {
    navigate('/calculate-cost', { state: { category } });
  };

  return (
    <section className="lux-section-wrapper">
      {/* ─── Main Architectural Hero Showcase (Edge-to-Edge Full Width matching Hero Section) ─── */}
      <div className="lux-main-frame">
        {/* Top Hero Section with Terracotta Villa Background */}
        <div className="lux-hero-backdrop">
          <img
            src="/images/inspired_interiors_bg.jpg"
            alt="Luxury Living Space Architecture"
            className="lux-hero-img"
          />
          {/* Subtle Gradient Scrim on Left for Maximum Text Readability */}
          <div className="lux-hero-scrim" />

          {/* Top-Right "Get a Quote" Floating Action */}
          <div className="lux-top-quote-wrapper">
            <button
              onClick={() => openWhatsAppInteriorInquiry('Luxury Interior Consultation - Get a Quote')}
              className="lux-top-quote-btn"
              aria-label="Get a Quote"
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Hero Main Content Row */}
          <div className="lux-hero-content-row">
            <div className="lux-hero-text-block">
              <h2 className="lux-hero-heading">
                Inspired<br />
                Interiors<br />
                for Every Space
              </h2>
              <p className="lux-hero-subtext">
                From cozy homes to dynamic workplaces and vibrant cafes,
                we craft interiors that reflect your vision, lifestyle, and soul.
              </p>

              <div className="lux-hero-actions">
                <button
                  onClick={() => navigate('/calculate-cost')}
                  className="lux-btn-explore"
                  aria-label="Explore Our Services"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => openWhatsAppInteriorInquiry('Watch Our Story Portfolio Inquiry')}
                  className="lux-btn-story"
                  aria-label="Watch Our Story"
                >
                  <div className="lux-story-play-icon">
                    <Play size={13} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 2 }} />
                  </div>
                  <span>Watch Our Story</span>
                </button>
              </div>
            </div>

            {/* Elegant Archway Cursive Script */}
            <div className="lux-arch-accent-box">
              <span className="lux-cursive-text">Interiors with a Soul</span>
            </div>
          </div>

          {/* ─── The 3 High-Impact Service Cards (Pop forward on hover) ─── */}
          <div className="lux-cards-row">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => handleCardClick(service.category)}
                  className="lux-pop-card"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(service.category);
                    }
                  }}
                  title={`${service.title} - Calculate Cost & View Designs`}
                >
                  {/* High-res Image Background */}
                  <div className="lux-pop-img-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="lux-pop-img"
                      loading="lazy"
                    />
                    <div className="lux-pop-img-overlay" />
                  </div>

                  {/* Top-Left Floating Icon Badge */}
                  <div className="lux-pop-icon-badge">
                    <Icon size={18} color="#1E1D1B" strokeWidth={2.4} />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="lux-pop-content">
                    <div className="lux-pop-header">
                      <h3 className="lux-pop-title">{service.title}</h3>
                      <div className="lux-pop-arrow-btn" aria-hidden="true">
                        <ArrowRight size={15} color="#1E1D1B" strokeWidth={2.5} />
                      </div>
                    </div>

                    <p className="lux-pop-desc">{service.desc}</p>

                    {/* High-Contrast Tags */}
                    <div className="lux-pop-tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="lux-pop-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Bottom Trust Bar & Contact Wave (Edge-to-Edge Full Width) ─── */}
        <div className="lux-bottom-bar">
          {/* 4 Trust Feature Items */}
          <div className="lux-trust-list">
            {trustItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.title} className="lux-trust-item-wrapper">
                  <div className="lux-trust-item">
                    <div className="lux-trust-icon-box">
                      <ItemIcon size={19} color="#8F3C12" strokeWidth={2.1} />
                    </div>
                    <div className="lux-trust-text-group">
                      <h4 className="lux-trust-item-title">{item.title}</h4>
                      <p className="lux-trust-item-desc">{item.desc}</p>
                    </div>
                  </div>
                  {index < trustItems.length - 1 && <div className="lux-trust-divider" />}
                </div>
              );
            })}
          </div>

          {/* Right Terracotta Wave Card */}
          <div className="lux-contact-banner">
            {/* Botanical Leaf Watermark */}
            <svg
              className="lux-banner-leaf-svg"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M95 90C85 60 65 30 20 20C20 45 35 75 95 90Z"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="rgba(255,255,255,0.08)"
              />
              <path
                d="M20 20C40 45 60 65 95 90"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <path
                d="M45 42C58 48 70 50 82 48"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
              />
              <path
                d="M60 60C72 68 82 72 90 70"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
              />
            </svg>

            <div className="lux-contact-info">
              <span className="lux-contact-tagline">
                Let's Create<br />Your Dream Space
              </span>
              <button
                onClick={() => openWhatsAppInteriorInquiry('Let\'s Create Your Dream Space - Contact Us')}
                className="lux-contact-pill-btn"
                aria-label="Contact Us"
              >
                <span>Contact Us</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stylesheet matching Hero Section Width & Length ─── */}
      <style>{`
        .lux-section-wrapper {
          width: 100%;
          background-color: #1E1D1B;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          position: relative;
          scroll-margin-top: 72px;
        }

        .lux-main-frame {
          position: relative;
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          background-color: #1E1D1B;
          min-height: calc(100vh - 72px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* ─── Top Hero Backdrop ─── */
        .lux-hero-backdrop {
          position: relative;
          width: 100%;
          flex-grow: 1;
          min-height: calc(100vh - 72px - 95px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.75rem 4rem 2.25rem;
          overflow: hidden;
        }

        .lux-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        .lux-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(20, 15, 12, 0.78) 0%,
            rgba(20, 15, 12, 0.52) 38%,
            rgba(20, 15, 12, 0.16) 68%,
            transparent 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* Top-Right "Get a Quote" */
        .lux-top-quote-wrapper {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .lux-top-quote-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background-color: rgba(255, 255, 255, 0.94);
          color: #1E1D1B;
          border: 1px solid rgba(255, 255, 255, 0.6);
          padding: 8px 20px;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: all 0.25s ease;
        }

        .lux-top-quote-btn:hover {
          background-color: #FFFFFF;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
        }

        /* Hero Content Row */
        .lux-hero-content-row {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 2.25rem;
        }

        .lux-hero-text-block {
          max-width: 620px;
        }

        .lux-hero-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.12;
          letter-spacing: -0.015em;
          margin: 0 0 1rem 0;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
        }

        .lux-hero-subtext {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.3vw, 1.08rem);
          color: rgba(255, 255, 255, 0.94);
          line-height: 1.55;
          margin: 0 0 1.6rem 0;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.55);
          max-width: 540px;
        }

        .lux-hero-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .lux-btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #FFFFFF;
          color: #1E1D1B;
          border: none;
          border-radius: 9999px;
          padding: 11px 24px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lux-btn-explore:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          background-color: #FAF5EE;
        }

        .lux-btn-story {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          padding: 9px 22px 9px 12px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .lux-btn-story:hover {
          background: rgba(255, 255, 255, 0.28);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
        }

        .lux-story-play-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lux-arch-accent-box {
          position: relative;
          padding-top: 1.5rem;
          padding-right: 2rem;
        }

        .lux-cursive-text {
          font-family: 'Caveat', cursive;
          font-size: clamp(1.9rem, 2.8vw, 2.6rem);
          font-weight: 700;
          color: #FFFFFF;
          transform: rotate(-3deg);
          display: inline-block;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.02em;
        }

        /* ─── 3 Service Cards Row (High-End Pop / Elevation Hover) ─── */
        .lux-cards-row {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .lux-pop-card {
          position: relative;
          height: 240px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          outline: none;
          background-color: #1A1614;
          border: 1.5px solid rgba(255, 255, 255, 0.28);
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12);
          transition: transform 0.38s cubic-bezier(0.2, 0.8, 0.25, 1.2),
                      box-shadow 0.38s cubic-bezier(0.2, 0.8, 0.25, 1.2),
                      border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.15rem 1.35rem 1.25rem;
          transform-origin: center bottom;
        }

        /* ── Pop Out Forward Hover Interaction ("aage ki taraf ubhar ho") ── */
        .lux-pop-card:hover,
        .lux-pop-card:focus-visible {
          transform: translateY(-12px) scale(1.026);
          box-shadow: 0 30px 60px -8px rgba(0, 0, 0, 0.75),
                      0 12px 28px -4px rgba(220, 150, 90, 0.35),
                      0 0 0 2.5px rgba(255, 255, 255, 0.88);
          border-color: rgba(255, 255, 255, 0.88);
          z-index: 10;
        }

        .lux-pop-img-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .lux-pop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lux-pop-card:hover .lux-pop-img {
          transform: scale(1.08);
        }

        .lux-pop-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 14, 12, 0.2) 0%,
            rgba(18, 14, 12, 0.58) 42%,
            rgba(16, 12, 10, 0.94) 85%,
            rgba(14, 10, 8, 0.98) 100%
          );
          transition: opacity 0.3s ease;
        }

        .lux-pop-card:hover .lux-pop-img-overlay {
          background: linear-gradient(
            180deg,
            rgba(18, 14, 12, 0.15) 0%,
            rgba(18, 14, 12, 0.5) 40%,
            rgba(16, 12, 10, 0.92) 82%,
            rgba(14, 10, 8, 0.97) 100%
          );
        }

        /* Top-Left Icon Badge */
        .lux-pop-icon-badge {
          position: relative;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .lux-pop-card:hover .lux-pop-icon-badge {
          transform: scale(1.08);
        }

        /* Card Bottom Content */
        .lux-pop-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        .lux-pop-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 4px;
        }

        .lux-pop-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.65);
        }

        .lux-pop-arrow-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
        }

        .lux-pop-card:hover .lux-pop-arrow-btn {
          transform: translateX(4px) scale(1.12);
          background-color: #FAF5EE;
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
        }

        .lux-pop-desc {
          font-family: var(--font-body);
          font-size: 0.83rem;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.42;
          margin: 0 0 11px 0;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .lux-pop-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .lux-pop-tag-pill {
          background-color: #FFFFFF;
          color: #1E1D1B;
          border-radius: 9999px;
          padding: 4px 12px;
          font-size: 0.72rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          letter-spacing: 0.01em;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .lux-pop-card:hover .lux-pop-tag-pill {
          background-color: #FFFFFF;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }

        /* ─── Bottom Trust & Contact Bar (Edge-to-Edge) ─── */
        .lux-bottom-bar {
          background-color: #FFFFFF;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          border-top: 1px solid #ECE7DE;
          width: 100%;
        }

        .lux-trust-list {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 1.25rem 3.5rem;
          gap: 1.5rem;
        }

        .lux-trust-item-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          gap: 1.5rem;
        }

        .lux-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-grow: 1;
        }

        .lux-trust-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #FAF2EA;
          border: 1px solid #ECDCCF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lux-trust-text-group {
          display: flex;
          flex-direction: column;
        }

        .lux-trust-item-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #1E1D1B;
          margin: 0 0 2px 0;
          line-height: 1.2;
          white-space: nowrap;
        }

        .lux-trust-item-desc {
          font-family: var(--font-body);
          font-size: 0.76rem;
          color: #78716C;
          font-weight: 500;
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
        }

        .lux-trust-divider {
          width: 1px;
          height: 40px;
          background-color: #ECE7DE;
          flex-shrink: 0;
        }

        /* Right Terracotta Wave Banner */
        .lux-contact-banner {
          position: relative;
          background: linear-gradient(135deg, #A2491F 0%, #83350F 100%);
          padding: 1.25rem 3.5rem 1.25rem 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 340px;
          border-top-left-radius: 44px;
          border-bottom-left-radius: 44px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .lux-banner-leaf-svg {
          position: absolute;
          right: -10px;
          bottom: -15px;
          width: 115px;
          height: 115px;
          pointer-events: none;
          opacity: 0.65;
        }

        .lux-contact-info {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
        }

        .lux-contact-tagline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.08rem;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        .lux-contact-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #FFFFFF;
          color: #8F3C12;
          border: none;
          border-radius: 9999px;
          padding: 7px 20px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.25s ease;
        }

        .lux-contact-pill-btn:hover {
          transform: translateX(3px) scale(1.03);
          background-color: #FAF5EE;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        /* ── Responsive Behavior ── */
        @media (max-width: 1200px) {
          .lux-hero-backdrop {
            padding: 2rem 2.25rem 2rem;
          }
          .lux-trust-list {
            padding: 1.2rem 2rem;
            gap: 1.25rem;
          }
          .lux-trust-item-wrapper {
            gap: 1.25rem;
          }
          .lux-contact-banner {
            padding: 1.2rem 2rem;
            min-width: 300px;
          }
        }

        @media (max-width: 992px) {
          .lux-main-frame {
            min-height: auto;
          }
          .lux-hero-backdrop {
            min-height: auto;
            padding: 2rem 1.5rem;
          }
          .lux-cards-row {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .lux-pop-card {
            height: 220px;
          }
          .lux-bottom-bar {
            flex-direction: column;
          }
          .lux-trust-list {
            flex-wrap: wrap;
            padding: 1.5rem 1.5rem 1rem;
            gap: 1.25rem;
          }
          .lux-trust-item-wrapper {
            flex: 1 1 calc(50% - 1.25rem);
          }
          .lux-trust-divider {
            display: none;
          }
          .lux-contact-banner {
            width: 100%;
            border-radius: 0;
            padding: 1.5rem;
            justify-content: flex-start;
          }
          .lux-arch-accent-box {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .lux-hero-backdrop {
            padding: 1.5rem 1.25rem;
          }
          .lux-hero-heading {
            font-size: 2.2rem;
          }
          .lux-trust-list {
            display: grid;
            grid-template-columns: 1fr;
            padding: 1.25rem;
          }
          .lux-trust-item-wrapper {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
