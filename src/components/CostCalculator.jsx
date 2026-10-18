import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Building2, Coffee, ChevronLeft, ArrowRight, Check, Sparkles,
  Calculator, IndianRupee, Percent, Layers, Ruler, Star, Send, Info,
  BedDouble, CookingPot, UtensilsCrossed, Tv, Sofa, DoorOpen, Paintbrush,
  ShieldCheck, SlidersHorizontal, Box, FileText, Palette, Leaf, Sun,
} from 'lucide-react';
import {
  CATEGORIES, QUALITY_LEVELS, CONFIG_OPTIONS, ADDONS, ROOM_DECOR_OPTIONS,
  calculateEstimate,
} from '../data/calculatorData';
import RoomDesigner from './RoomDesigner/RoomDesigner';
import OfficeDesigns from './OfficeDesigns';

// ── Icon map for category icons ──────────────────────────────────────────────
const ICON_MAP = { Home, Building2, Coffee };
const DECOR_ICON_MAP = { BedDouble, CookingPot, UtensilsCrossed, Tv, Sofa, DoorOpen, Paintbrush };

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatCurrency = (n) =>
  n == null ? '—' : '₹' + Math.round(n).toLocaleString('en-IN');

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function CostCalculator() {
  const navigate = useNavigate();

  // ── State (Default to viewStep 1 so users land on Select Your Space Type first) ──
  const [viewStep, setViewStep] = useState(1);
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [area, setArea] = useState(CATEGORIES[0].areaRange.default);
  const [qualityId, setQualityId] = useState('premium');
  const [configId, setConfigId] = useState(
    CONFIG_OPTIONS[CATEGORIES[0].id].options[1]?.id ||
      CONFIG_OPTIONS[CATEGORIES[0].id].options[0].id,
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDecor, setSelectedDecor] = useState([]);
  const [isRoomDesignerOpen, setIsRoomDesignerOpen] = useState(false);

  // Derived data for active category
  const catMeta = CATEGORIES.find((c) => c.id === activeCat);
  const qualities = QUALITY_LEVELS[activeCat] || [];
  const configs = CONFIG_OPTIONS[activeCat];
  const addons = ADDONS[activeCat] || [];

  // ── Category switch handler ──────────────────────────────────────────────
  const switchCategory = (id) => {
    setActiveCat(id);
    const newCat = CATEGORIES.find((c) => c.id === id);
    if (newCat) {
      setArea(newCat.areaRange.default);
    }
    setQualityId('premium');
    if (CONFIG_OPTIONS[id]?.options) {
      setConfigId(
        CONFIG_OPTIONS[id].options[1]?.id || CONFIG_OPTIONS[id].options[0].id,
      );
    }
    setSelectedAddons([]);
    setSelectedDecor([]);
    setViewStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Toggle addon ─────────────────────────────────────────────────────────
  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  // ── Toggle decor option ─────────────────────────────────────────────────
  const toggleDecor = (decorId) => {
    setSelectedDecor((prev) =>
      prev.includes(decorId)
        ? prev.filter((id) => id !== decorId)
        : [...prev, decorId],
    );
  };

  // ── Estimate ─────────────────────────────────────────────────────────────
  const estimate = useMemo(
    () =>
      calculateEstimate({
        categoryId: activeCat,
        area,
        qualityId,
        configId,
        selectedAddonIds: selectedAddons,
        selectedDecorIds: selectedDecor,
      }),
    [activeCat, area, qualityId, configId, selectedAddons, selectedDecor],
  );

  // ── WhatsApp share ───────────────────────────────────────────────────────
  const shareOnWhatsApp = () => {
    if (!estimate) return;
    const msg = [
      `*DreamSpace (Efive Studio) — Interior Cost Estimate*`,
      ``,
      `Category: ${catMeta.label}`,
      `Area: ${area.toLocaleString('en-IN')} ${catMeta.areaUnit}`,
      `Quality: ${estimate.qualityLabel}`,
      `Config: ${estimate.configLabel}`,
      ``,
      `Material & Labor: ${formatCurrency(estimate.materialAndLabor)}`,
      `Config Overhead: ${formatCurrency(estimate.configOverhead)}`,
      `Add-ons: ${formatCurrency(estimate.addonsTotal)}`,
      ...(estimate.decorTotal > 0 ? [`Room Décor: ${formatCurrency(estimate.decorTotal)}`] : []),
      `Design Fee (8%): ${formatCurrency(estimate.designFee)}`,
      `GST (18%): ${formatCurrency(estimate.gst)}`,
      ``,
      `*Estimated Total: ${formatCurrency(estimate.grandTotal)}*`,
      ``,
      `_This is an indicative estimate. Final pricing may vary based on site conditions._`,
    ].join('%0A');
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  // ── Slider fill percentage ───────────────────────────────────────────────
  const sliderPercent = catMeta?.areaRange
    ? ((area - catMeta.areaRange.min) /
        (catMeta.areaRange.max - catMeta.areaRange.min)) *
      100
    : 50;

  // Active configuration label
  const activeConfigLabel =
    configs?.options?.find((o) => o.id === configId)?.label || '2 BHK';

  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div style={styles.pageWrapper}>
      {/* ── Room Designer Modal ── */}
      {isRoomDesignerOpen && (
        <RoomDesigner 
          initialBhkId={configId} 
          onClose={() => setIsRoomDesignerOpen(false)} 
        />
      )}

      {/* ── View Step 1: Category Selection (Select Your Space Type - Image 2) ── */}
      {viewStep === 1 ? (
        <div style={styles.categoryStepContainer}>
          <button onClick={() => navigate('/')} style={styles.backBtnPill} className="calc-back-pill">
            <ChevronLeft size={16} />
            <span>Back to Store</span>
          </button>

          <header style={styles.header}>
            <div style={styles.headerBadge}>
              <Calculator size={14} color="#9E4316" />
              <span>INTERIOR COST ESTIMATOR</span>
            </div>
            <h1 style={styles.headerTitle}>
              Select Your <span style={{ color: '#9E4316' }}>Space Type</span>
            </h1>
            <p style={styles.headerSub}>
              Choose the category of space you want to calculate estimated costs for.
            </p>
          </header>

          <div className="calc-cat-large-grid" style={{ maxWidth: '1240px', margin: '2rem auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => switchCategory(cat.id)}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(12,12,12,0.92) 0%, rgba(15,15,15,0.48) 50%, rgba(15,15,15,0.06) 100%), url("${cat.image}")`,
                    minHeight: '440px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    padding: '2.25rem 2rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    textAlign: 'left',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="calc-cat-large"
                >
                  <div style={styles.catCardContent}>
                    <div style={styles.catCardIconWrapper} className="calc-cat-icon-wrapper">
                      <Icon size={26} color="#FFFFFF" strokeWidth={2} />
                    </div>
                    <h3 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                      {cat.label}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.45 }}>
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : activeCat === 'office' ? (
        <div style={{ padding: '2rem' }}>
          <button onClick={() => { setViewStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={styles.backBtnPill} className="calc-back-pill">
            <ChevronLeft size={16} />
            <span>Back to Categories</span>
          </button>
          <OfficeDesigns />
        </div>
      ) : (
        /* ── View Step 2: HERO ESTIMATOR (Matching Image 1 perfectly) ── */
        <div style={{ width: '100%' }}>
          
          {/* ══════════ HERO SECTION ══════════ */}
          <section style={styles.heroSection}>
            {/* Background Image Container */}
            <div style={styles.heroBgImage} />
            {/* Ambient Left Gradient Overlay for crisp typography */}
            <div style={styles.heroOverlay} />

            {/* ── Top Bar / Navbar (Image 1 Navbar with Home/About removed as requested) ── */}
            <header style={styles.topNavbar}>
              <div style={styles.navContainer}>
                {/* Brand Logo on Left */}
                <div style={styles.brandLogo} onClick={() => navigate('/')}>
                  <div style={styles.brandLogoIconBox}>
                    <Home size={19} color="#9E4316" strokeWidth={2.4} />
                  </div>
                  <div>
                    <div style={styles.brandLogoTitle}>DreamSpace</div>
                    <div style={styles.brandLogoSubtitle}>Interior Solutions</div>
                  </div>
                </div>

                {/* Center links: "Home", "How It Works", "Inspiration", "About" REMOVED per user instructions */}
                <div style={{ flex: 1 }} />

                {/* Right Side: Sun Theme icon + Get Started Button */}
                <div style={styles.navRightGroup}>
                  <button
                    style={styles.navThemeBtn}
                    title="Toggle Theme"
                    aria-label="Toggle theme"
                  >
                    <Sun size={18} color="#9E4316" strokeWidth={2.2} />
                  </button>

                  <button
                    onClick={() => setIsRoomDesignerOpen(true)}
                    style={styles.navGetStartedBtn}
                  >
                    <span>Get Started</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </header>

            {/* ── Main Hero Content Area ── */}
            <div style={styles.heroContentContainer}>
              
              {/* LEFT COLUMN: Headings, Badges, Configuration Card & Feature Bar */}
              <div style={styles.heroLeftCol}>
                
                {/* Back to Categories Button */}
                <button
                  onClick={() => { setViewStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={styles.backBtnPill}
                  className="calc-back-pill"
                >
                  <ChevronLeft size={16} />
                  <span>Back to Categories</span>
                </button>

                {/* Interior Cost Estimator Pill Badge */}
                <div style={styles.heroBadge}>
                  <Home size={13} color="#9E4316" strokeWidth={2.4} />
                  <span>INTERIOR COST ESTIMATOR</span>
                </div>

                {/* Main Headline */}
                <h1 style={styles.heroTitle}>
                  Calculate Your<br />
                  <span style={styles.heroTitleAccent}>Interior Cost</span>
                </h1>

                {/* Subtitle */}
                <p style={styles.heroSubtitle}>
                  Get an instant, transparent estimate for your dream space. Choose your space type, quality, and add-ons — we handle the maths.
                </p>

                {/* 3 Feature Pills Row */}
                <div style={styles.featurePillsRow}>
                  <div style={styles.featurePill}>
                    <ShieldCheck size={16} color="#9E4316" strokeWidth={2.2} />
                    <span>Accurate Estimate</span>
                  </div>
                  <div style={styles.featurePill}>
                    <SlidersHorizontal size={16} color="#9E4316" strokeWidth={2.2} />
                    <span>Customizable Options</span>
                  </div>
                  <div style={styles.featurePill}>
                    <ShieldCheck size={16} color="#9E4316" strokeWidth={2.2} />
                    <span>Transparent Pricing</span>
                  </div>
                </div>

                {/* ── Select Configuration Card ── */}
                <div style={styles.configCard}>
                  {/* Card Header */}
                  <div style={styles.configCardHeader}>
                    <Home size={18} color="#9E4316" strokeWidth={2.2} />
                    <h3 style={styles.configCardTitle}>Select Configuration</h3>
                  </div>

                  {/* 5 BHK Selection Buttons */}
                  <div style={styles.bhkGrid}>
                    {configs.options.map((opt) => {
                      const isActive = opt.id === configId;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setConfigId(opt.id)}
                          style={{
                            ...styles.bhkBtn,
                            ...(isActive ? styles.bhkBtnActive : styles.bhkBtnInactive),
                          }}
                          className={`calc-bhk-btn ${isActive ? 'active' : ''}`}
                        >
                          {isActive ? (
                            <Check size={16} color="#FFFFFF" strokeWidth={2.6} />
                          ) : (
                            <Home size={16} color="#78716C" strokeWidth={2} />
                          )}
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Design in Interactive Planner Full-Width CTA */}
                  <button
                    onClick={() => setIsRoomDesignerOpen(true)}
                    style={styles.plannerCtaBtn}
                    className="calc-planner-cta"
                  >
                    <Sparkles size={17} color="#FFFFFF" />
                    <span>Design this {activeConfigLabel} in Interactive Planner</span>
                    <ArrowRight size={17} color="#FFFFFF" />
                  </button>
                </div>

                {/* ── Glassmorphic Bottom Feature Bar ── */}
                <div style={styles.glassFeatureBar}>
                  <div style={styles.glassFeatureItem}>
                    <Box size={17} color="#9E4316" strokeWidth={2.2} />
                    <span>3D Visualization</span>
                  </div>
                  <div style={styles.glassDivider} />
                  <div style={styles.glassFeatureItem}>
                    <FileText size={17} color="#9E4316" strokeWidth={2.2} />
                    <span>Detailed Estimate</span>
                  </div>
                  <div style={styles.glassDivider} />
                  <div style={styles.glassFeatureItem}>
                    <Palette size={17} color="#9E4316" strokeWidth={2.2} />
                    <span>Multiple Styles</span>
                  </div>
                  <div style={styles.glassDivider} />
                  <div style={styles.glassFeatureItem}>
                    <ShieldCheck size={17} color="#9E4316" strokeWidth={2.2} />
                    <span>Trusted by Homeowners</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Script Calligraphy & Pebble Badge */}
              <div style={styles.heroRightCol}>
                
                {/* "Beautiful Spaces Within Your Budget" Handwritten Script with Arrow */}
                <div style={styles.scriptAccentWrapper}>
                  <div style={styles.scriptText}>
                    Beautiful<br />
                    Spaces<br />
                    Within Your<br />
                    Budget
                  </div>
                  {/* Curved Hand-drawn SVG Arrow */}
                  <svg
                    width="44"
                    height="68"
                    viewBox="0 0 44 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: '8px', marginLeft: '26px' }}
                  >
                    <path
                      d="M 10 6 C 30 18, 36 40, 20 58"
                      stroke="#6B2E10"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 13 49 L 20 58 L 26 51"
                      stroke="#6B2E10"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Bottom-Right Organic Pebble Badge */}
                <div style={styles.pebbleBadge}>
                  <Leaf size={26} color="rgba(255,255,255,0.92)" strokeWidth={1.5} />
                  <div style={styles.pebbleBadgeText}>
                    Your Dream<br />Home, Our<br />Expertise
                  </div>
                  <div style={styles.pebbleDivider} />
                </div>

              </div>

            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════════════════════
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#FAF8F5',
    color: '#1C1917',
    fontFamily: 'var(--font-body)',
    width: '100%',
    overflowX: 'hidden',
  },

  categoryStepContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '2.5rem 2rem 5rem',
  },

  backBtnPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 18px',
    borderRadius: '9999px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    color: '#1F2937',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.2s ease',
    marginBottom: '1.5rem',
  },

  /* ── Hero Section ── */
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FDFBF7',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/calc_hero_bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, rgba(254, 252, 248, 0.98) 0%, rgba(254, 252, 248, 0.94) 42%, rgba(254, 252, 248, 0.65) 60%, rgba(254, 252, 248, 0.1) 85%, rgba(254, 252, 248, 0) 100%)',
    zIndex: 2,
  },

  /* ── Top Navbar ── */
  topNavbar: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    padding: '1.25rem 2rem 0.5rem',
  },
  navContainer: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  brandLogoIconBox: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: '#F7EDE4',
    border: '1.5px solid #EACDB8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(158,67,22,0.12)',
  },
  brandLogoTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#1C1917',
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
  },
  brandLogoSubtitle: {
    fontSize: '0.72rem',
    color: '#78716C',
    fontWeight: 500,
    letterSpacing: '0.04em',
  },
  navRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  navThemeBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '1px solid #E7DFD5',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
  },
  navGetStartedBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#934015',
    backgroundImage: 'linear-gradient(135deg, #9C4316 0%, #85370F 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    padding: '10px 22px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(147, 64, 21, 0.35)',
    transition: 'all 0.2s ease',
  },

  /* ── Hero Content Layout ── */
  heroContentContainer: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1440px',
    width: '100%',
    margin: '0 auto',
    padding: '1.5rem 2rem 3rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  heroLeftCol: {
    flex: '1 1 660px',
    maxWidth: '680px',
  },
  heroRightCol: {
    flex: '1 1 380px',
    position: 'relative',
    minHeight: '560px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    pointerEvents: 'none',
  },

  /* Back Button Pill */
  backBtnPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #E5E7EB',
    borderRadius: '9999px',
    padding: '7px 18px',
    fontSize: '0.84rem',
    fontWeight: 600,
    color: '#1F2937',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    marginBottom: '16px',
    transition: 'all 0.2s ease',
  },

  /* Hero Badge */
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    backgroundColor: '#FBF5EE',
    border: '1px solid #EAD8C7',
    color: '#9E4316',
    borderRadius: '9999px',
    padding: '6px 14px',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },

  /* Title & Subtitle */
  heroTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    color: '#1C1917',
    marginBottom: '14px',
    letterSpacing: '-0.025em',
  },
  heroTitleAccent: {
    color: '#9E4316',
  },
  heroSubtitle: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#57534E',
    maxWidth: '560px',
    marginBottom: '20px',
  },

  /* Feature Pills */
  featurePillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '24px',
  },
  featurePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(220, 205, 185, 0.65)',
    borderRadius: '9999px',
    padding: '8px 16px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#383431',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },

  /* ── Configuration Card ── */
  configCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '22px',
    padding: '24px',
    boxShadow: '0 12px 36px rgba(40, 25, 10, 0.07)',
    border: '1px solid #EFEAE3',
    maxWidth: '640px',
  },
  configCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  configCardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#1C1917',
    margin: 0,
    fontFamily: 'var(--font-heading)',
  },
  bhkGrid: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  bhkBtn: {
    flex: '1 1 0',
    minWidth: '85px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: '12px 14px',
    borderRadius: '12px',
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  bhkBtnInactive: {
    border: '1.5px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    fontWeight: 600,
  },
  bhkBtnActive: {
    border: '1.5px solid #934015',
    backgroundColor: '#934015',
    color: '#FFFFFF',
    fontWeight: 700,
    boxShadow: '0 4px 14px rgba(147, 64, 21, 0.35)',
  },
  plannerCtaBtn: {
    width: '100%',
    marginTop: '18px',
    backgroundColor: '#934015',
    backgroundImage: 'linear-gradient(135deg, #9C4316 0%, #85370F 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    padding: '15px 24px',
    fontSize: '0.98rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(147, 64, 21, 0.35)',
    transition: 'all 0.2s ease',
  },

  /* ── Glassmorphic Bottom Feature Bar ── */
  glassFeatureBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.85)',
    borderRadius: '16px',
    padding: '12px 24px',
    maxWidth: '640px',
    marginTop: '22px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
  },
  glassFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#292524',
  },
  glassDivider: {
    width: '1px',
    height: '18px',
    backgroundColor: '#E7DFD5',
  },

  /* ── Script Accent (Right side) ── */
  scriptAccentWrapper: {
    marginTop: '20px',
    marginRight: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scriptText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1.15,
    color: '#292524',
    textAlign: 'center',
    transform: 'rotate(-4deg)',
    textShadow: '0 1px 2px rgba(255,255,255,0.7)',
  },

  /* ── Pebble Badge (Bottom Right) ── */
  pebbleBadge: {
    background: 'linear-gradient(135deg, #A85A2D 0%, #87411B 100%)',
    borderRadius: '65px 45px 75px 35px',
    padding: '24px 28px',
    color: '#FFFFFF',
    boxShadow: '0 12px 32px rgba(135, 65, 27, 0.35)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '10px',
    marginRight: '20px',
  },
  pebbleBadgeText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.18rem',
    lineHeight: 1.25,
    marginTop: '8px',
    color: '#FFFFFF',
  },
  pebbleDivider: {
    width: '44px',
    height: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '2px',
    marginTop: '12px',
  },

  /* ── Lower Content Section ── */
  lowerContentWrapper: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '3rem 2rem 5rem',
  },
  lowerGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 380px',
    gap: '2.5rem',
    alignItems: 'start',
  },
  lowerLeftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  lowerRightCol: {
    position: 'sticky',
    top: '2rem',
  },

  /* Cards */
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EFEAE3',
    borderRadius: '18px',
    padding: '1.75rem',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#1C1917',
    fontFamily: 'var(--font-heading)',
    margin: 0,
  },
  addonHint: {
    fontSize: '0.8rem',
    color: '#78716C',
    marginTop: '2px',
    display: 'block',
  },

  /* Room Decor Grid (Apartment) */
  decorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.25rem',
  },
  decorCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '14px',
    border: '2px solid',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    background: '#fff',
    textAlign: 'left',
    padding: 0,
    fontFamily: 'var(--font-body)',
  },
  decorSelectedBadge: {
    position: 'absolute',
    top: '0.6rem',
    right: '0.6rem',
    zIndex: 5,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#9E4316',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
  },
  decorImage: {
    width: '100%',
    height: '140px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#F3EFEA',
  },
  decorInfo: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  decorTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  decorLabel: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#1C1917',
  },
  decorDesc: {
    fontSize: '0.75rem',
    color: '#78716C',
    lineHeight: 1.45,
    margin: 0,
  },
  decorPrice: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#9E4316',
    marginTop: '0.35rem',
  },

  /* Slider */
  sliderRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  sliderVal: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#9E4316',
    fontFamily: 'var(--font-heading)',
  },
  slider: {
    width: '100%',
    height: '7px',
    borderRadius: '4px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.78rem',
    color: '#78716C',
    marginTop: '0.65rem',
    fontWeight: 500,
  },

  /* Quality cards */
  qualityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  qualityCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem',
    borderRadius: '14px',
    border: '2px solid',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all .2s ease',
    fontFamily: 'var(--font-body)',
  },
  qualityTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  qualityDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
  },
  qualityLabel: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#1C1917',
  },
  qualityRate: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#9E4316',
    fontFamily: 'var(--font-heading)',
    marginBottom: '0.75rem',
  },
  qualityRateUnit: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: '#78716C',
  },
  specList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  specItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.4rem',
    fontSize: '0.74rem',
    color: '#57534E',
    lineHeight: 1.35,
  },

  /* Addon buttons */
  addonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '0.75rem',
  },
  addonBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'var(--font-body)',
    transition: 'all .2s ease',
  },
  addonCheckbox: {
    flexShrink: 0,
  },
  addonChecked: {
    width: '18px',
    height: '18px',
    borderRadius: '5px',
    backgroundColor: '#9E4316',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addonUnchecked: {
    width: '18px',
    height: '18px',
    borderRadius: '5px',
    border: '1.5px solid #D1D5DB',
  },
  addonInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  addonLabel: {
    fontSize: '0.84rem',
    fontWeight: 600,
    color: '#1C1917',
  },
  addonPrice: {
    fontSize: '0.76rem',
    fontWeight: 700,
    color: '#9E4316',
  },

  /* ── Estimate Sidebar Card ── */
  estimateCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EFEAE3',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
  },
  estimateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #F3EFEA',
    backgroundColor: '#FDFBF8',
  },
  estimateTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1C1917',
    fontFamily: 'var(--font-heading)',
    margin: 0,
  },
  breakdownSection: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.84rem',
    gap: '0.5rem',
  },
  breakdownLabel: {
    lineHeight: 1.4,
  },
  breakdownVal: {
    fontVariantNumeric: 'tabular-nums',
    flexShrink: 0,
  },
  divider: {
    height: '1px',
    backgroundColor: '#EAE4DC',
    margin: '0.5rem 0',
  },
  grandTotalBox: {
    margin: '0 1.5rem 1rem',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    backgroundColor: '#FBF5EE',
    border: '1.5px solid #EAD8C7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: {
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#1C1917',
  },
  grandTotalVal: {
    fontSize: '1.45rem',
    fontWeight: 800,
    color: '#9E4316',
    fontFamily: 'var(--font-heading)',
  },
  disclaimer: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0 1.5rem 1.25rem',
    fontSize: '0.74rem',
    color: '#78716C',
    lineHeight: 1.45,
  },
  whatsappBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    width: 'calc(100% - 3rem)',
    margin: '0 1.5rem',
    padding: '0.9rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all .2s ease',
    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
  },
  browseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: 'calc(100% - 3rem)',
    margin: '0.75rem 1.5rem 1.5rem',
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1.5px solid #E5E7EB',
    backgroundColor: 'transparent',
    color: '#1F2937',
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all .2s ease',
  },

  /* Step 1 Category styles */
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#FBF5EE',
    color: '#9E4316',
    padding: '0.35rem 1rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    border: '1px solid #EAD8C7',
  },
  headerTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 700,
    color: '#1C1917',
    lineHeight: 1.2,
    marginBottom: '0.75rem',
  },
  headerSub: {
    fontSize: '1rem',
    color: '#57534E',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  catCardContent: {
    position: 'relative',
    zIndex: 10,
    color: '#fff',
  },
  catCardIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.28)',
    marginBottom: '1rem',
  },
};
