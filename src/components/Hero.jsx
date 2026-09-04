import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  // Subtle parallax on mouse move for the image
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const img = imageRef.current;
      if (!img) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `scale(1.04) translate(${x * -10}px, ${y * -6}px)`;
    };

    const handleMouseLeave = () => {
      const img = imageRef.current;
      if (img) img.style.transform = 'scale(1.04) translate(0, 0)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="premium-hero" ref={heroRef}>
      {/* ─── Left Column: Editorial Content ─── */}
      <div className="premium-hero__left">

        {/* Eyebrow */}
        <div className="ph-eyebrow">
          <span className="ph-eyebrow__dot" />
          <span className="ph-eyebrow__text">CURATED INTERIORS&nbsp;&nbsp;•&nbsp;&nbsp;TIMELESS DESIGN</span>
        </div>

        {/* Headline */}
        <h1 className="ph-headline">
          <span className="ph-headline__line1">We Curate Spaces,</span>
          <span className="ph-headline__line2">Not Just Furniture.</span>
        </h1>

        {/* Supporting Statement */}
        <p className="ph-subtext">
          Thoughtfully curated furniture and interiors designed to make every space feel distinctly yours.
        </p>

        {/* CTA Row */}
        <div className="ph-cta-row">
          <button
            className="ph-cta-primary"
            onClick={onExploreClick}
            aria-label="Explore Collection"
          >
            <span>Explore Collection</span>
            <ArrowRight size={16} className="ph-cta-icon" />
          </button>

          <Link
            to="/calculate-cost"
            className="ph-cta-secondary"
            aria-label="Design Your Space"
          >
            <Sparkles size={14} className="ph-cta-sparkle" />
            <span>Design Your Space</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="ph-scroll-indicator" onClick={onExploreClick} role="button" tabIndex={0} aria-label="Scroll down to explore">
          <span className="ph-scroll-text">Scroll to explore</span>
          <ChevronDown size={16} className="ph-scroll-arrow" />
        </div>
      </div>

      {/* ─── Right Column: Editorial Image Composition ─── */}
      <div className="premium-hero__right">
        {/* Main editorial image */}
        <div className="ph-img-frame">
          <img
            ref={imageRef}
            src="/hero_bed_2.jpg"
            alt="Efive Studio - Curated Interior"
            className="ph-img-main"
          />
          {/* Subtle dark vignette at bottom */}
          <div className="ph-img-vignette" />
        </div>

        {/* Floating accent card */}
        <div className="ph-float-card">
          <div className="ph-float-card__icon">
            <Sparkles size={14} />
          </div>
          <div className="ph-float-card__content">
            <span className="ph-float-card__label">Award-Winning</span>
            <span className="ph-float-card__value">Interior Design Studio</span>
          </div>
        </div>

        {/* Subtle material swatch accent */}
        <div className="ph-swatch-strip">
          <span className="ph-swatch" style={{ backgroundColor: '#C5A880' }} />
          <span className="ph-swatch" style={{ backgroundColor: '#8B6E4A' }} />
          <span className="ph-swatch" style={{ backgroundColor: '#E8DCC4' }} />
          <span className="ph-swatch" style={{ backgroundColor: '#2C2B29' }} />
          <span className="ph-swatch-label">Signature Palette</span>
        </div>
      </div>
    </section>
  );
}
