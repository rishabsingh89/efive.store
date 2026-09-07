import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Settings, Leaf, Users, ShieldCheck } from 'lucide-react';

const Hero = React.memo(function Hero({ onExploreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

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

  // Subtle parallax on mouse move for the image (GPU-accelerated via rAF, disabled on touch)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Skip parallax on touch devices to save resources
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return; // throttle to one rAF at a time
      rafId = requestAnimationFrame(() => {
        const img = imageRef.current;
        if (!img) { rafId = null; return; }
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `scale(0.95) translate(${x * -10}px, ${y * -6}px)`;
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      const img = imageRef.current;
      if (img) img.style.transform = 'scale(0.95) translate(0, 0)';
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
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
          <section className="premium-hero">
            {/* ─── Left Column: Editorial Content ─── */}
            <div className="premium-hero__left">

              {/* Eyebrow */}
              <div className="ph-eyebrow" style={{ background: 'rgba(46, 125, 50, 0.08)', borderColor: 'rgba(46, 125, 50, 0.25)' }}>
                <span className="ph-eyebrow__dot" style={{ backgroundColor: '#2e7d32', boxShadow: '0 0 8px rgba(46, 125, 50, 0.6)' }} />
                <span className="ph-eyebrow__text" style={{ color: '#2e7d32' }}>FROM OUR FACTORY&nbsp;&nbsp;•&nbsp;&nbsp;TO YOUR HOME</span>
              </div>

              {/* Headline */}
              <h1 className="ph-headline">
                <span className="ph-headline__line1">Manufacturing</span>
                <span className="ph-headline__line2" style={{ color: '#2e7d32' }}>With Purpose.</span>
              </h1>
              
              <p className="ph-subtext" style={{ borderLeftColor: '#2e7d32', marginBottom: '2rem' }}>
                Precision Craftsmanship. Better Furniture. A Sustainable Tomorrow.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Settings size={22} />, label: 'Advanced\nTechnology' },
                  { icon: <Leaf size={22} />, label: 'Sustainable\nMaterials' },
                  { icon: <Users size={22} />, label: 'Skilled\nCraftsmen' },
                  { icon: <ShieldCheck size={22} />, label: 'Quality\nAssured' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.6rem', backgroundColor: '#e8f5e9', borderRadius: '50%', color: '#2e7d32' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: '#55534E', whiteSpace: 'pre-line' }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  aria-label="See Our Process"
                  style={{ background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)', boxShadow: '0 10px 30px rgba(46, 125, 50, 0.25)' }}
                >
                  <span>See Our Process</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>

            </div>

            {/* ─── Right Column: Editorial Image Composition ─── */}
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img
                  src="/realistic_manufacturing.jpg"
                  alt="Furniture Manufacturing with purpose"
                  className="ph-img-main"
                  loading="lazy"
                  decoding="async"
                />
                <div className="ph-img-vignette" />
              </div>
            </div>
          </section>
        </div>

        {/* Slide 3: Delivery */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <section className="premium-hero">
            <div className="premium-hero__left">
              <div className="ph-eyebrow" style={{ background: 'rgba(29, 78, 216, 0.08)', borderColor: 'rgba(29, 78, 216, 0.25)' }}>
                <span className="ph-eyebrow__dot" style={{ backgroundColor: '#1d4ed8', boxShadow: '0 0 8px rgba(29, 78, 216, 0.6)' }} />
                <span className="ph-eyebrow__text" style={{ color: '#1d4ed8' }}>FAST & SAFE DELIVERY</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">Premium Delivery,</span>
                <span className="ph-headline__line2" style={{ color: '#1d4ed8' }}>Right To Your Door.</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#1d4ed8', marginBottom: '2rem' }}>
                We treat every piece with the utmost care. Experience hassle-free, secure delivery straight to your room of choice.
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)', boxShadow: '0 10px 30px rgba(29, 78, 216, 0.25)' }}
                >
                  <span>Track Order</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src="/delivery_realistic.jpg" alt="Premium Delivery" className="ph-img-main" loading="lazy" decoding="async" />
                <div className="ph-img-vignette" />
              </div>
            </div>
          </section>
        </div>

        {/* Slide 4: Assembly */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <section className="premium-hero">
            <div className="premium-hero__left">
              <div className="ph-eyebrow" style={{ background: 'rgba(217, 119, 6, 0.08)', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                <span className="ph-eyebrow__dot" style={{ backgroundColor: '#d97706', boxShadow: '0 0 8px rgba(217, 119, 6, 0.6)' }} />
                <span className="ph-eyebrow__text" style={{ color: '#d97706' }}>PROFESSIONAL ASSEMBLY</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">Expertly Crafted,</span>
                <span className="ph-headline__line2" style={{ color: '#d97706' }}>Perfectly Assembled.</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#d97706', marginBottom: '2rem' }}>
                Sit back and relax. Our skilled professionals assemble your furniture with precision, leaving your space clean and ready to enjoy.
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)', boxShadow: '0 10px 30px rgba(217, 119, 6, 0.25)' }}
                >
                  <span>Book Assembly</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src="/assembly_realistic.jpg" alt="Professional Assembly" className="ph-img-main" loading="lazy" decoding="async" />
                <div className="ph-img-vignette" />
              </div>
            </div>
          </section>
        </div>

        {/* Slide 5: Happy Living */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <section className="premium-hero">
            <div className="premium-hero__left">
              <div className="ph-eyebrow" style={{ background: 'rgba(147, 51, 234, 0.08)', borderColor: 'rgba(147, 51, 234, 0.25)' }}>
                <span className="ph-eyebrow__dot" style={{ backgroundColor: '#9333ea', boxShadow: '0 0 8px rgba(147, 51, 234, 0.6)' }} />
                <span className="ph-eyebrow__text" style={{ color: '#9333ea' }}>HAPPY LIVING</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">The Ultimate Comfort,</span>
                <span className="ph-headline__line2" style={{ color: '#9333ea' }}>For A Better Tomorrow.</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#9333ea', marginBottom: '2rem' }}>
                Turn your house into a home. Quality sleep, beautiful spaces, and lasting memories start with the perfect foundation.
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)', boxShadow: '0 10px 30px rgba(147, 51, 234, 0.25)' }}
                >
                  <span>Find Your Comfort</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src="/happy_living.jpg" alt="Happy Living" className="ph-img-main" loading="lazy" decoding="async" />
                <div className="ph-img-vignette" />
              </div>
            </div>
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
        {[0, 1, 2, 3, 4].map((idx) => (
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
});

export default Hero;
