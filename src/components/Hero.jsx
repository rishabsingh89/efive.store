import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown, Settings, Leaf, Users, ShieldCheck } from 'lucide-react';
import { getHeroCMS } from '../data/products';

const defaultSlides = [
  {
    id: 1,
    eyebrow: "CURATED INTERIORS • TIMELESS DESIGN",
    title: "Curated Furniture,",
    subtitle: "Starting From ₹3k (only)",
    description: "",
    image: "/hero_bed_2.jpg",
    ctaText: "Explore Collection"
  },
  {
    id: 2,
    eyebrow: "FROM OUR FACTORY • TO YOUR HOME",
    title: "Manufacturing",
    subtitle: "With Purpose.",
    description: "Precision Craftsmanship. Better Furniture. A Sustainable Tomorrow.",
    image: "/realistic_manufacturing.jpg",
    ctaText: "See Our Process"
  },
  {
    id: 3,
    eyebrow: "FAST & SAFE DELIVERY",
    title: "Premium Delivery,",
    subtitle: "Right To Your Door.",
    description: "We treat every piece with the utmost care. Experience hassle-free, secure delivery straight to your room of choice.",
    image: "/delivery_realistic.jpg",
    ctaText: "Track Order"
  },
  {
    id: 4,
    eyebrow: "PROFESSIONAL ASSEMBLY",
    title: "Expertly Crafted,",
    subtitle: "Perfectly Assembled.",
    description: "Sit back and relax. Our skilled professionals assemble your furniture with precision, leaving your space clean and ready to enjoy.",
    image: "/assembly_realistic.jpg",
    ctaText: "Book Assembly"
  },
  {
    id: 5,
    eyebrow: "HAPPY LIVING",
    title: "The Ultimate Comfort,",
    subtitle: "For A Better Tomorrow.",
    description: "Turn your house into a home. Quality sleep, beautiful spaces, and lasting memories start with the perfect foundation.",
    image: "/happy_living.jpg",
    ctaText: "Find Your Comfort"
  }
];

const Hero = React.memo(function Hero({ onExploreClick }) {
  const [heroCMS, setHeroCMS] = useState(getHeroCMS());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = (heroCMS?.slides && heroCMS.slides.length > 0) ? heroCMS.slides : defaultSlides;
  const totalSlides = slides.length;

  useEffect(() => {
    const handleHeroUpdate = (e) => {
      if (e?.detail) setHeroCMS(e.detail.heroCMS || e.detail);
      else setHeroCMS(getHeroCMS());
    };
    window.addEventListener('efive_hero_updated', handleHeroUpdate);
    window.addEventListener('efive_cms_updated', handleHeroUpdate);
    return () => {
      window.removeEventListener('efive_hero_updated', handleHeroUpdate);
      window.removeEventListener('efive_cms_updated', handleHeroUpdate);
    };
  }, []);

  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Auto-play: cycles slides every 6s, pauses when mouse hovers over slider
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, totalSlides]);

  const heroRef = useRef(null);
  const imageRef = useRef(null);

  // Subtle parallax on mouse move for the image (GPU-accelerated via rAF, disabled on touch)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;
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

  const slide1 = slides[0] || defaultSlides[0];
  const slide2 = slides[1] || defaultSlides[1];
  const slide3 = slides[2] || defaultSlides[2];
  const slide4 = slides[3] || defaultSlides[3];
  const slide5 = slides[4] || defaultSlides[4];
  const extraSlides = slides.slice(5);

  return (
    <div 
      className="hero-slider-container" 
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            <div className="premium-hero__left">
              <div className="ph-eyebrow">
                <span className="ph-eyebrow__dot" />
                <span className="ph-eyebrow__text">{slide1.eyebrow || 'CURATED INTERIORS • TIMELESS DESIGN'}</span>
              </div>

              <h1 className="ph-headline">
                <span className="ph-headline__line1">{slide1.title || 'Curated Furniture,'}</span>
                <span className="ph-headline__line2">{slide1.subtitle || 'Starting From ₹3k (only)'}</span>
              </h1>

              {slide1.description && (
                <p className="ph-subtext" style={{ marginBottom: '2rem' }}>
                  {slide1.description}
                </p>
              )}

              <div className="ph-cta-row">
                <button
                  className="ph-cta-secondary"
                  onClick={onExploreClick}
                  aria-label="Explore Collection"
                >
                  <span>{slide1.ctaText || 'Explore Collection'}</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>

                <Link
                  to="/calculate-cost"
                  className="ph-cta-primary"
                  aria-label="Design Your Space"
                >
                  <Sparkles size={14} className="ph-cta-sparkle" />
                  <span>Design Your Space</span>
                </Link>
              </div>

              <div className="ph-scroll-indicator" onClick={onExploreClick} role="button" tabIndex={0} aria-label="Scroll down to explore">
                <span className="ph-scroll-text">Scroll to explore</span>
                <ChevronDown size={16} className="ph-scroll-arrow" />
              </div>
            </div>

            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img
                  ref={imageRef}
                  src={slide1.image || '/hero_bed_2.jpg'}
                  alt={slide1.title || 'Efive Studio - Curated Interior'}
                  className="ph-img-main"
                />
                <div className="ph-img-vignette" />
              </div>
            </div>
          </section>
        </div>

        {/* Slide 2 */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <section className="premium-hero">
            <div className="premium-hero__left">
              <div className="ph-eyebrow" style={{ background: 'rgba(46, 125, 50, 0.08)', borderColor: 'rgba(46, 125, 50, 0.25)' }}>
                <span className="ph-eyebrow__dot" style={{ backgroundColor: '#2e7d32', boxShadow: '0 0 8px rgba(46, 125, 50, 0.6)' }} />
                <span className="ph-eyebrow__text" style={{ color: '#2e7d32' }}>{slide2.eyebrow || 'FROM OUR FACTORY • TO YOUR HOME'}</span>
              </div>

              <h1 className="ph-headline">
                <span className="ph-headline__line1">{slide2.title || 'Manufacturing'}</span>
                <span className="ph-headline__line2" style={{ color: '#2e7d32' }}>{slide2.subtitle || 'With Purpose.'}</span>
              </h1>
              
              <p className="ph-subtext" style={{ borderLeftColor: '#2e7d32', marginBottom: '2rem' }}>
                {slide2.description || 'Precision Craftsmanship. Better Furniture. A Sustainable Tomorrow.'}
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Settings size={22} />, label: 'Advanced\nTechnology' },
                  { icon: <Leaf size={22} />, label: 'Sustainable\nMaterials' },
                  { icon: <Users size={22} />, label: 'Skilled\nCraftsmen' },
                  { icon: <ShieldCheck size={22} />, label: 'Quality\nAssured' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.6rem', backgroundColor: '#C8D8C9', borderRadius: '50%', color: '#2e7d32' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: '#2F3E34', whiteSpace: 'pre-line' }}>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  aria-label="See Our Process"
                  style={{ background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)', boxShadow: '0 10px 30px rgba(46, 125, 50, 0.25)' }}
                >
                  <span>{slide2.ctaText || 'See Our Process'}</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>

            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img
                  src={slide2.image || '/realistic_manufacturing.jpg'}
                  alt={slide2.title || 'Furniture Manufacturing with purpose'}
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
                <span className="ph-eyebrow__text" style={{ color: '#1d4ed8' }}>{slide3.eyebrow || 'FAST & SAFE DELIVERY'}</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">{slide3.title || 'Premium Delivery,'}</span>
                <span className="ph-headline__line2" style={{ color: '#1d4ed8' }}>{slide3.subtitle || 'Right To Your Door.'}</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#1d4ed8', marginBottom: '2rem' }}>
                {slide3.description || 'We treat every piece with the utmost care. Experience hassle-free, secure delivery straight to your room of choice.'}
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)', boxShadow: '0 10px 30px rgba(29, 78, 216, 0.25)' }}
                >
                  <span>{slide3.ctaText || 'Track Order'}</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src={slide3.image || '/delivery_realistic.jpg'} alt={slide3.title || 'Premium Delivery'} className="ph-img-main" loading="lazy" decoding="async" />
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
                <span className="ph-eyebrow__text" style={{ color: '#d97706' }}>{slide4.eyebrow || 'PROFESSIONAL ASSEMBLY'}</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">{slide4.title || 'Expertly Crafted,'}</span>
                <span className="ph-headline__line2" style={{ color: '#d97706' }}>{slide4.subtitle || 'Perfectly Assembled.'}</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#d97706', marginBottom: '2rem' }}>
                {slide4.description || 'Sit back and relax. Our skilled professionals assemble your furniture with precision, leaving your space clean and ready to enjoy.'}
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)', boxShadow: '0 10px 30px rgba(217, 119, 6, 0.25)' }}
                >
                  <span>{slide4.ctaText || 'Book Assembly'}</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src={slide4.image || '/assembly_realistic.jpg'} alt={slide4.title || 'Professional Assembly'} className="ph-img-main" loading="lazy" decoding="async" />
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
                <span className="ph-eyebrow__text" style={{ color: '#9333ea' }}>{slide5.eyebrow || 'HAPPY LIVING'}</span>
              </div>
              <h1 className="ph-headline">
                <span className="ph-headline__line1">{slide5.title || 'The Ultimate Comfort,'}</span>
                <span className="ph-headline__line2" style={{ color: '#9333ea' }}>{slide5.subtitle || 'For A Better Tomorrow.'}</span>
              </h1>
              <p className="ph-subtext" style={{ borderLeftColor: '#9333ea', marginBottom: '2rem' }}>
                {slide5.description || 'Turn your house into a home. Quality sleep, beautiful spaces, and lasting memories start with the perfect foundation.'}
              </p>
              <div className="ph-cta-row">
                <button
                  className="ph-cta-primary"
                  onClick={onExploreClick}
                  style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)', boxShadow: '0 10px 30px rgba(147, 51, 234, 0.25)' }}
                >
                  <span>{slide5.ctaText || 'Find Your Comfort'}</span>
                  <ArrowRight size={16} className="ph-cta-icon" />
                </button>
              </div>
            </div>
            <div className="premium-hero__right">
              <div className="ph-img-frame">
                <img src={slide5.image || '/happy_living.jpg'} alt={slide5.title || 'Happy Living'} className="ph-img-main" loading="lazy" decoding="async" />
                <div className="ph-img-vignette" />
              </div>
            </div>
          </section>
        </div>

        {/* Extra Slides if user adds more than 5 */}
        {extraSlides.map((extraSlide, index) => (
          <div key={`extra-${index}`} style={{ width: '100%', flexShrink: 0 }}>
            <section className="premium-hero">
              <div className="premium-hero__left">
                {extraSlide.eyebrow && (
                  <div className="ph-eyebrow">
                    <span className="ph-eyebrow__dot" />
                    <span className="ph-eyebrow__text">{extraSlide.eyebrow}</span>
                  </div>
                )}
                <h1 className="ph-headline">
                  <span className="ph-headline__line1">{extraSlide.title}</span>
                  {extraSlide.subtitle && <span className="ph-headline__line2">{extraSlide.subtitle}</span>}
                </h1>
                {extraSlide.description && (
                  <p className="ph-subtext" style={{ marginBottom: '2rem' }}>
                    {extraSlide.description}
                  </p>
                )}
                <div className="ph-cta-row">
                  <button
                    className="ph-cta-primary"
                    onClick={onExploreClick}
                  >
                    <span>{extraSlide.ctaText || 'Explore Collection'}</span>
                    <ArrowRight size={16} className="ph-cta-icon" />
                  </button>
                </div>
              </div>
              <div className="premium-hero__right">
                <div className="ph-img-frame">
                  <img src={extraSlide.image || '/hero_bed_2.jpg'} alt={extraSlide.title} className="ph-img-main" loading="lazy" decoding="async" />
                  <div className="ph-img-vignette" />
                </div>
              </div>
            </section>
          </div>
        ))}
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
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: currentSlide === idx ? '32px' : '10px',
              height: '10px',
              borderRadius: '10px',
              backgroundColor: currentSlide === idx ? '#D4B483' : 'rgba(0,0,0,0.2)',
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
