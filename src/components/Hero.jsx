import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Settings, Leaf, Users, ShieldCheck } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

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

  const sliderBtnStyle = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    color: '#333',
    transition: 'transform 0.2s',
  };

  return (
    <div className="hero-slider-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        className="hero-slider-track"
        style={{
          display: 'flex',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentSlide * 100}%)`,
          width: '100%'
        }}
      >
        {/* Slide 1 */}
        <div style={{ width: '100%', flexShrink: 0 }}>
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
                <span className="ph-headline__line1">Curated Furniture,</span>
                <span className="ph-headline__line2">Starting From ₹3k (only)</span>
              </h1>

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
            </div>
          </section>
        </div>

        {/* Slide 2 */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <section className="nh-hero" style={{ display: 'block', padding: 0 }}>
            <img src="/manufacturing_slide.jpg" alt="Manufacturing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </section>
        </div>
      </div>

      {/* Slider Controls */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '0', 
        right: '0', 
        transform: 'translateY(-50%)',
        zIndex: 50, 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '0 2rem',
        pointerEvents: 'none' 
      }}>
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
          style={{...sliderBtnStyle, pointerEvents: 'auto'}}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ChevronLeft size={24}/>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }} 
          style={{...sliderBtnStyle, pointerEvents: 'auto'}}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ChevronRight size={24}/>
        </button>
      </div>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '0',
        right: '0',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem'
      }}>
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: currentSlide === idx ? '32px' : '10px',
              height: '10px',
              borderRadius: '10px',
              backgroundColor: currentSlide === idx ? '#C5A880' : 'rgba(0,0,0,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
