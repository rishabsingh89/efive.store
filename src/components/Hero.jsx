import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Tag, Sparkles, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    image: '/hero_background.jpg',
    themeColor: '#d32f2f', // Red Theme like HomeTown Sale
    badgeText: 'EFIVE GRAND SALE',
    titleMain: 'MANO YA NA MANO',
    titleSub: 'SALE',
    discountBadge: 'UP TO 60% OFF*',
    offerDetail: 'BUY LUXURY VELVET SOFA',
    offerExtra: '& GET DESIGNER OTTOMAN FREE',
    ctaText: 'SHOP LIVING ROOM',
    storeExclusive: 'STORE EXCLUSIVE OFFER*',
  },
  {
    id: 1,
    image: '/hero_slide2.jpg',
    themeColor: '#b71c1c', // Crimson Burgundy Theme
    badgeText: 'BEDROOM SPECIAL',
    titleMain: 'FESTIVE COMBO',
    titleSub: 'OFFER',
    discountBadge: 'UP TO 50% OFF*',
    offerDetail: 'BUY DIAGO KING BED',
    offerExtra: '& GET 3-DOOR WARDROBE FREE',
    ctaText: 'SHOP BEDROOM',
    storeExclusive: 'LIMITED PERIOD OFFER*',
  },
  {
    id: 2,
    image: '/hero_slide3.jpg',
    themeColor: '#e65100', // Deep Amber / Festival Orange Theme
    badgeText: 'DESIGN FESTIVAL 2025',
    titleMain: 'FESTIVE SAVINGS',
    titleSub: 'FESTIVAL',
    discountBadge: '₹10,000 OFF*',
    offerDetail: 'FREE DESIGN CONSULTATION ON',
    offerExtra: 'MODULAR KITCHEN & DINING',
    ctaText: 'BOOK CONSULTATION',
    storeExclusive: 'SPECIAL FESTIVAL DISCOUNT*',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
    themeColor: '#1a237e', // Royal Sapphire Navy Theme
    badgeText: 'ROYAL LIVING SALE',
    titleMain: 'PREMIUM SOFA',
    titleSub: 'BONANZA',
    discountBadge: 'UP TO 45% OFF*',
    offerDetail: 'BUY 3-SEATER CHESTERFIELD SOFA',
    offerExtra: '& GET 2-SEATER SOFA FREE',
    ctaText: 'EXPLORE SOFAS',
    storeExclusive: 'EFIVE EXCLUSIVE DEAL*',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    themeColor: '#2e7d32', // Emerald Forest Green Theme
    badgeText: 'CUSTOM HOME DECOR',
    titleMain: 'DREAM HOUSE',
    titleSub: 'COLLECTION',
    discountBadge: 'BUY 2 GET 1 FREE*',
    offerDetail: 'BESPOKE CUSHION COVERS, ACCENTS',
    offerExtra: '& LUXURY PENDANT LIGHTING',
    ctaText: 'EXPLORE DECOR',
    storeExclusive: 'NEW ARRIVALS 2025*',
  },
];

const SLIDE_INTERVAL = 3000; // 3 seconds per slide (as requested)

export default function Hero({ onExploreClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance timer — slides right-to-left every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  return (
    <div
      className="hero-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Top Progress Bar (3 seconds progress timer) ─── */}
      <div style={styles.progressBarTrack}>
        {!isPaused && (
          <div
            key={currentIndex}
            style={styles.progressBarFill}
          />
        )}
      </div>

      {/* ─── Horizontal Sliding Strip (5 slides right to left) ─── */}
      <div
        style={{
          ...styles.slidesStrip,
          transform: `translateX(-${currentIndex * (100 / SLIDES.length)}%)`,
        }}
      >
        {SLIDES.map((slide) => (
          <div key={slide.id} style={styles.slidePane}>
            {/* Background Room Photo */}
            <div
              style={{
                ...styles.bgImage,
                backgroundImage: `url("${slide.image}")`,
              }}
            />

            {/* HomeTown Style Left Side Offer Banner Box */}
            <div className="hero-offer-banner">
              <div
                style={{
                  ...styles.offerCard,
                  backgroundColor: slide.themeColor,
                }}
              >
                {/* Diagonal Accent Ribbon */}
                <div style={styles.diagonalBadge}>
                  <Tag size={12} style={{ marginRight: '4px' }} />
                  {slide.badgeText}
                </div>

                <div style={styles.titleGroup}>
                  <div style={styles.titleMain}>{slide.titleMain}</div>
                  <div style={styles.titleSub}>{slide.titleSub}</div>
                </div>

                <div style={styles.discountBox}>
                  <span style={styles.discountLabel}>UP TO</span>
                  <span style={styles.discountVal}>{slide.discountBadge}</span>
                </div>

                <div style={styles.offerTextSection}>
                  <div style={styles.offerLine1}>{slide.offerDetail}</div>
                  <div style={styles.offerAmpersand}>&</div>
                  <div style={styles.offerLine2}>{slide.offerExtra}</div>
                </div>

                <button
                  onClick={onExploreClick}
                  style={styles.ctaButton}
                  className="btn-offer-cta"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Bottom Right Store Exclusive Tag */}
            <div style={styles.storeTag}>
              <ShieldCheck size={14} style={{ color: '#25D366' }} />
              <span>{slide.storeExclusive}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Left / Right Navigation Arrows ─── */}
      <button
        onClick={goPrev}
        style={{ ...styles.navArrow, left: '1rem' }}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goNext}
        style={{ ...styles.navArrow, right: '1rem' }}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* ─── Bottom Pagination Indicators ─── */}
      <div style={styles.dotsTrack}>
        {SLIDES.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              ...styles.dotItem,
              backgroundColor: idx === currentIndex ? slide.themeColor : 'rgba(255, 255, 255, 0.4)',
              width: idx === currentIndex ? '36px' : '10px',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* ─── Bottom Center: Calculate Interior Cost CTA ─── */}
      <Link to="/calculate-cost" style={styles.calcCta} className="calc-hero-cta">
        <div style={styles.calcCtaShimmer} />
        <Sparkles size={20} style={{ flexShrink: 0 }} />
        <span style={styles.calcCtaText}>Calculate Your Interior Cost</span>
        <ArrowRight size={20} style={{ flexShrink: 0 }} />
      </Link>
    </div>
  );
}

const styles = {
  // heroContainer and offerBannerWrapper moved to index.css for responsiveness

  progressBarTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff5722',
    animation: `heroProgress ${SLIDE_INTERVAL}ms linear forwards`,
    transformOrigin: 'left',
  },

  /* 5 slides side-by-side inside strip (total width 500%) */
  slidesStrip: {
    display: 'flex',
    width: `${SLIDES.length * 100}%`,
    height: '100%',
    transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)',
    willChange: 'transform',
  },

  slidePane: {
    position: 'relative',
    width: `${100 / SLIDES.length}%`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  bgImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },

  /* HomeTown style left-side diagonal offer banner card */
  // offerBannerWrapper moved to index.css

  offerCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '2.5rem 2rem 2rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#ffffff',
    boxShadow: '8px 0 25px rgba(0,0,0,0.3)',
    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)', // HomeTown style angled cut banner
  },

  diagonalBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#ffeb3b',
    color: '#111111',
    fontWeight: 800,
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    padding: '0.35rem 0.75rem',
    borderRadius: '3px',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    marginBottom: '1.25rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },

  titleGroup: {
    marginBottom: '0.75rem',
  },
  titleMain: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.1rem',
    fontWeight: 900,
    lineHeight: 1.05,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  titleSub: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 800,
    color: '#ffeb3b',
    fontStyle: 'italic',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },

  discountBox: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
    margin: '0.75rem 0 1.25rem 0',
    padding: '0.5rem 0',
    borderTop: '1px solid rgba(255,255,255,0.25)',
    borderBottom: '1px solid rgba(255,255,255,0.25)',
  },
  discountLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.9)',
  },
  discountVal: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.8rem',
    fontWeight: 900,
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },

  offerTextSection: {
    marginBottom: '1.5rem',
  },
  offerLine1: {
    fontSize: '0.85rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  offerAmpersand: {
    fontSize: '1rem',
    fontWeight: 900,
    color: '#ffeb3b',
    margin: '0.1rem 0',
  },
  offerLine2: {
    fontSize: '1rem',
    fontWeight: 900,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#ffeb3b',
  },

  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    backgroundColor: '#ffffff',
    color: '#111111',
    fontWeight: 800,
    fontSize: '0.8rem',
    letterSpacing: '0.08em',
    padding: '0.75rem 1.4rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    transition: 'all 0.25s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  },

  storeTag: {
    position: 'absolute',
    bottom: '1.25rem',
    right: '1.5rem',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    color: '#ffffff',
    padding: '0.4rem 0.85rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    border: '1px solid rgba(255,255,255,0.15)',
  },

  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.3)',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },

  dotsTrack: {
    position: 'absolute',
    top: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 15,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    backdropFilter: 'blur(4px)',
  },

  calcCta: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 15,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '1rem 2.5rem',
    borderRadius: '40px',
    background: 'linear-gradient(135deg, #1B8A4E 0%, #25A85A 40%, #2ECC71 100%)',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 800,
    fontFamily: 'var(--font-heading)',
    letterSpacing: '0.03em',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    boxShadow: '0 6px 24px rgba(46,204,113,0.45), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
    border: '1.5px solid rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  calcCtaShimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
    animation: 'ctaShimmer 3s ease-in-out infinite',
    pointerEvents: 'none',
  },
  calcCtaText: {
    fontSize: '1.2rem',
    fontWeight: 800,
    letterSpacing: '0.03em',
  },

  dotItem: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: 0,
  },
};

