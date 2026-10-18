import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openWhatsAppInteriorInquiry } from '../whatsapp';

export default function InteriorSection() {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate('/calculate-cost', { state: { category } });
  };

  return (
    <section className="lux-section-wrapper">
      <div className="lux-container">
        {/* Main 16:9 Inspired Interiors Frame */}
        <div className="lux-media-frame">
          <img
            src="/images/inspired_interiors_full.jpg"
            alt="Inspired Interiors for Every Space - Efive Studio"
            className="lux-media-image"
          />

          {/* ─── Interactive Hotspot Overlays ─── */}
          {/* 1. Top-Right: "Get a Quote ->" */}
          <button
            onClick={() => openWhatsAppInteriorInquiry('Luxury Interior Solutions - Get a Quote')}
            className="lux-hotspot lux-hotspot-quote"
            title="Get a Quote"
            aria-label="Get a Quote"
          />

          {/* 2. "Explore Our Services ->" */}
          <button
            onClick={() => navigate('/calculate-cost')}
            className="lux-hotspot lux-hotspot-explore"
            title="Explore Our Services"
            aria-label="Explore Our Services"
          />

          {/* 3. "Watch Our Story" */}
          <button
            onClick={() => openWhatsAppInteriorInquiry('Watch Our Story Portfolio Inquiry')}
            className="lux-hotspot lux-hotspot-story"
            title="Watch Our Story"
            aria-label="Watch Our Story"
          />

          {/* 4. Card 1: "Apartment Interior" */}
          <div
            onClick={() => handleCardClick('apartment')}
            className="lux-hotspot lux-hotspot-card-apartment"
            role="button"
            tabIndex={0}
            title="Apartment Interior - Calculate Cost"
            aria-label="Apartment Interior"
          />

          {/* 5. Card 2: "Office Interior" */}
          <div
            onClick={() => handleCardClick('office')}
            className="lux-hotspot lux-hotspot-card-office"
            role="button"
            tabIndex={0}
            title="Office Interior - View Designs"
            aria-label="Office Interior"
          />

          {/* 6. Card 3: "Cafe Restaurant Interior" */}
          <div
            onClick={() => handleCardClick('cafe')}
            className="lux-hotspot lux-hotspot-card-cafe"
            role="button"
            tabIndex={0}
            title="Cafe Restaurant Interior - Calculate Cost"
            aria-label="Cafe Restaurant Interior"
          />

          {/* 7. Bottom-Right: "Contact Us ->" */}
          <button
            onClick={() => openWhatsAppInteriorInquiry('Let\'s Create Your Dream Space - Contact Us')}
            className="lux-hotspot lux-hotspot-contact"
            title="Contact Us"
            aria-label="Contact Us"
          />
        </div>
      </div>

      {/* ─── Stylesheet ─── */}
      <style>{`
        .lux-section-wrapper {
          width: 100%;
          background-color: transparent;
          padding: 1.5rem 0.5rem 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba(197, 168, 128, 0.15);
        }

        .lux-container {
          width: 96%;
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .lux-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(30, 29, 27, 0.12), 0 4px 16px rgba(30, 29, 27, 0.06);
          background-color: #1E1D1B;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .lux-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* ─── Hotspot Buttons (Invisible overlays with smooth interactive hover feedback) ─── */
        .lux-hotspot {
          position: absolute;
          cursor: pointer;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.001);
          border-radius: 9999px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        /* Hover glow effect for buttons */
        .lux-hotspot-quote:hover,
        .lux-hotspot-explore:hover,
        .lux-hotspot-contact:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.5);
          transform: scale(1.03);
        }

        .lux-hotspot-story:hover {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
          transform: scale(1.02);
        }

        /* Hover glow effect for the 3 service cards */
        .lux-hotspot-card-apartment,
        .lux-hotspot-card-office,
        .lux-hotspot-card-cafe {
          border-radius: 18px;
        }
        .lux-hotspot-card-apartment:hover,
        .lux-hotspot-card-office:hover,
        .lux-hotspot-card-cafe:hover {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.45), 0 8px 24px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        /* ─── Exact Percent Coordinates from 1024x576 image ─── */
        /* Top-Right: Get a Quote */
        .lux-hotspot-quote {
          top: 3.1%;
          left: 83.8%;
          width: 9.2%;
          height: 4.8%;
        }

        /* Explore Our Services */
        .lux-hotspot-explore {
          top: 71.2%;
          left: 7.6%;
          width: 12.2%;
          height: 5.2%;
        }

        /* Watch Our Story */
        .lux-hotspot-story {
          top: 71.2%;
          left: 20.8%;
          width: 11.2%;
          height: 5.2%;
        }

        /* Card 1: Apartment Interior */
        .lux-hotspot-card-apartment {
          top: 51.0%;
          left: 3.1%;
          width: 31.0%;
          height: 28.5%;
        }

        /* Card 2: Office Interior */
        .lux-hotspot-card-office {
          top: 51.0%;
          left: 35.0%;
          width: 30.1%;
          height: 28.5%;
        }

        /* Card 3: Cafe Restaurant Interior */
        .lux-hotspot-card-cafe {
          top: 51.0%;
          left: 66.0%;
          width: 31.0%;
          height: 28.5%;
        }

        /* Bottom-Right: Contact Us */
        .lux-hotspot-contact {
          top: 88.0%;
          left: 79.8%;
          width: 8.5%;
          height: 4.5%;
        }

        /* ─── Responsive Adjustments ─── */
        @media (max-width: 1024px) {
          .lux-section-wrapper {
            padding: 1rem 0.75rem 2rem;
          }
          .lux-media-frame {
            border-radius: 14px;
          }
        }
      `}</style>
    </section>
  );
}
