import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Building2, Coffee, ChevronLeft, ArrowRight, Check, Sparkles,
  Calculator, IndianRupee, Percent, Layers, Ruler, Star, Send, Info,
  BedDouble, CookingPot, UtensilsCrossed, Tv, Sofa, DoorOpen, Paintbrush,
} from 'lucide-react';
import {
  CATEGORIES, QUALITY_LEVELS, CONFIG_OPTIONS, ADDONS, ROOM_DECOR_OPTIONS,
  calculateEstimate,
} from '../data/calculatorData';
import RoomDesigner from './RoomDesigner/RoomDesigner';

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

  // ── State ────────────────────────────────────────────────────────────────
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
  const qualities = QUALITY_LEVELS[activeCat];
  const configs = CONFIG_OPTIONS[activeCat];
  const addons = ADDONS[activeCat];

  // ── Category switch handler ──────────────────────────────────────────────
  const switchCategory = (id) => {
    setActiveCat(id);
    const newCat = CATEGORIES.find((c) => c.id === id);
    setArea(newCat.areaRange.default);
    setQualityId('premium');
    setConfigId(
      CONFIG_OPTIONS[id].options[1]?.id || CONFIG_OPTIONS[id].options[0].id,
    );
    setSelectedAddons([]);
    setSelectedDecor([]);
    setViewStep(2);
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
      `*Efive Studio — Interior Cost Estimate*`,
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
  const sliderPercent =
    ((area - catMeta.areaRange.min) /
      (catMeta.areaRange.max - catMeta.areaRange.min)) *
    100;

  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div style={styles.page}>
      {/* ── Room Designer Modal ── */}
      {isRoomDesignerOpen && (
        <RoomDesigner 
          initialBhkId={configId} 
          onClose={() => setIsRoomDesignerOpen(false)} 
        />
      )}

      {/* ── Back button ── */}
      {viewStep === 1 ? (
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          <ChevronLeft size={18} />
          <span>Back to Store</span>
        </button>
      ) : (
        <button onClick={() => setViewStep(1)} style={styles.backBtn}>
          <ChevronLeft size={18} />
          <span>Back to Categories</span>
        </button>
      )}

      {/* ── Hero header ── */}
      <header style={styles.header}>
        <div style={styles.headerBadge}>
          <Calculator size={14} />
          <span>INTERIOR COST ESTIMATOR</span>
        </div>
        <h1 style={styles.headerTitle}>
          Calculate Your <span style={styles.headerAccent}>Interior Cost</span>
        </h1>
        <p style={styles.headerSub}>
          Get an instant, transparent estimate for your dream space.
          Choose your space type, quality, and add-ons — we handle the maths.
        </p>
      </header>

      {/* ── View Step 1: Category Selection ── */}
      {viewStep === 1 ? (
        <div className="calc-cat-large-grid">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => switchCategory(cat.id)}
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.6) 45%, rgba(15,15,15,0.1) 100%), url("${cat.image}")`,
                }}
                className="calc-cat-large"
              >
                <div style={styles.catCardContent}>
                  <div style={styles.catCardIconWrapper} className="calc-cat-icon-wrapper">
                    <Icon size={36} color="#C5A880" className="calc-cat-icon" />
                  </div>
                  <h3 className="calc-cat-title-large">{cat.label}</h3>
                  <p className="calc-cat-desc-large">{cat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
      <div style={styles.mainGrid}>
        {/* ── View Step 2: Form & Estimate ── */}
        {/* LEFT — INPUTS */}
        <div style={styles.formCol}>
          
          {/* Configuration select */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Layers size={16} style={{ color: 'hsl(34,40%,64%)' }} />
              <h3 style={styles.cardTitle}>{configs.label}</h3>
            </div>
            <div style={{
              ...styles.configGrid,
              ...(activeCat === 'apartment' ? { display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '1rem' } : {})
            }}>
              {configs.options.map((opt) => {
                const isActive = opt.id === configId;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setConfigId(opt.id)}
                    style={{
                      ...styles.configBtn,
                      ...(activeCat === 'apartment' ? { flex: 1, padding: '1rem 0.5rem', justifyContent: 'center', fontSize: '0.95rem' } : {}),
                      ...(isActive ? styles.configBtnActive : {}),
                    }}
                    className="calc-config-btn"
                  >
                    {isActive && <Check size={14} style={styles.configCheck} />}
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Design Room CTA for Apartments */}
            {activeCat === 'apartment' && (
              <button 
                onClick={() => setIsRoomDesignerOpen(true)}
                style={styles.designRoomBtn}
                className="calc-design-btn"
              >
                <Sparkles size={16} />
                <span>Design this {configs.options.find(o => o.id === configId)?.label || 'Room'} in Interactive Planner</span>
              </button>
            )}
          </div>

          {/* Room Decoration Options (Apartment only) */}
          {activeCat === 'apartment' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Sparkles size={16} style={{ color: 'hsl(34,40%,64%)' }} />
                <h3 style={styles.cardTitle}>Room Décor & Furniture</h3>
                <span style={styles.addonHint}>Select what you need</span>
              </div>
              <div style={styles.decorGrid}>
                {ROOM_DECOR_OPTIONS.map((item) => {
                  const Icon = DECOR_ICON_MAP[item.icon];
                  const isSelected = selectedDecor.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleDecor(item.id)}
                      style={{
                        ...styles.decorCard,
                        borderColor: isSelected
                          ? 'hsl(34,40%,64%)'
                          : 'hsl(40,13%,88%)',
                        boxShadow: isSelected
                          ? '0 4px 16px rgba(197,168,128,0.2)'
                          : '0 2px 8px rgba(30,29,27,0.03)',
                      }}
                      className="calc-decor-card"
                    >
                      {/* Selected badge */}
                      {isSelected && (
                        <div style={styles.decorSelectedBadge}>
                          <Check size={12} color="#fff" />
                        </div>
                      )}
                      {/* Image */}
                      <div
                        style={{
                          ...styles.decorImage,
                          backgroundImage: `url("${item.image}")`,
                        }}
                      />
                      {/* Info */}
                      <div style={styles.decorInfo}>
                        <div style={styles.decorTitleRow}>
                          {Icon && <Icon size={16} style={{ color: 'hsl(34,40%,64%)', flexShrink: 0 }} />}
                          <span style={styles.decorLabel}>{item.label}</span>
                        </div>
                        <p style={styles.decorDesc}>{item.description}</p>
                        <span style={styles.decorPrice}>{formatCurrency(item.price)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Area slider */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Ruler size={16} style={{ color: 'hsl(34,40%,64%)' }} />
              <h3 style={styles.cardTitle}>Area</h3>
            </div>
            <div style={styles.sliderRow}>
              <span style={styles.sliderVal}>
                {area.toLocaleString('en-IN')} {catMeta.areaUnit}
              </span>
            </div>
            <input
              type="range"
              min={catMeta.areaRange.min}
              max={catMeta.areaRange.max}
              step={catMeta.areaRange.step}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              style={{
                ...styles.slider,
                background: `linear-gradient(to right, #C5A880 0%, #C5A880 ${sliderPercent}%, hsl(40,13%,88%) ${sliderPercent}%, hsl(40,13%,88%) 100%)`,
              }}
              className="calc-slider"
            />
            <div style={styles.sliderLabels}>
              <span>{catMeta.areaRange.min.toLocaleString('en-IN')}</span>
              <span>{catMeta.areaRange.max.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Quality Level */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Star size={16} style={{ color: 'hsl(34,40%,64%)' }} />
              <h3 style={styles.cardTitle}>Quality Level</h3>
            </div>
            <div style={styles.qualityGrid}>
              {qualities.map((q) => {
                const isActive = q.id === qualityId;
                return (
                  <button
                    key={q.id}
                    onClick={() => setQualityId(q.id)}
                    style={{
                      ...styles.qualityCard,
                      borderColor: isActive ? q.color : 'hsl(40,13%,88%)',
                      backgroundColor: isActive
                        ? `${q.color}08`
                        : 'hsl(0,0%,100%)',
                    }}
                    className="calc-quality-card"
                  >
                    <div style={styles.qualityTop}>
                      <span
                        style={{
                          ...styles.qualityDot,
                          backgroundColor: q.color,
                        }}
                      />
                      <span style={styles.qualityLabel}>{q.label}</span>
                      {isActive && (
                        <Check
                          size={14}
                          style={{ color: q.color, marginLeft: 'auto' }}
                        />
                      )}
                    </div>
                    <span style={styles.qualityRate}>
                      {formatCurrency(q.ratePerSqft)}
                      <small style={styles.qualityRateUnit}>/sq ft</small>
                    </span>
                    <ul style={styles.specList}>
                      {q.specs.map((s) => (
                        <li key={s} style={styles.specItem}>
                          <Check size={10} style={{ flexShrink: 0, color: q.color }} />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Sparkles size={16} style={{ color: 'hsl(34,40%,64%)' }} />
              <h3 style={styles.cardTitle}>Luxury Add-ons</h3>
              <span style={styles.addonHint}>Select all that apply</span>
            </div>
            <div style={styles.addonGrid}>
              {addons.map((a) => {
                const isSelected = selectedAddons.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    style={{
                      ...styles.addonBtn,
                      borderColor: isSelected
                        ? 'hsl(34,40%,64%)'
                        : 'hsl(40,13%,88%)',
                      backgroundColor: isSelected
                        ? 'hsl(34,40%,64%,0.06)'
                        : '#fff',
                    }}
                    className="calc-addon-btn"
                  >
                    <div style={styles.addonCheckbox}>
                      {isSelected ? (
                        <div style={styles.addonChecked}>
                          <Check size={11} color="#fff" />
                        </div>
                      ) : (
                        <div style={styles.addonUnchecked} />
                      )}
                    </div>
                    <div style={styles.addonInfo}>
                      <span style={styles.addonLabel}>{a.label}</span>
                      <span style={styles.addonPrice}>
                        {formatCurrency(a.price)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — ESTIMATE PANEL */}
        <div style={styles.estimateCol}>
          <div style={styles.estimateCard}>
            <div style={styles.estimateHeader}>
              <IndianRupee size={18} />
              <h3 style={styles.estimateTitle}>Your Estimate</h3>
            </div>

            {estimate ? (
              <>
                {/* Breakdown rows */}
                <div style={styles.breakdownSection}>
                  <Row
                    label={`Material & Labor (${formatCurrency(estimate.ratePerSqft)}/sqft × ${area.toLocaleString('en-IN')})`}
                    value={estimate.materialAndLabor}
                  />
                  <Row
                    label={`${estimate.configLabel} overhead`}
                    value={estimate.configOverhead}
                  />
                  {estimate.addonsTotal > 0 && (
                    <Row
                      label="Selected add-ons"
                      value={estimate.addonsTotal}
                    />
                  )}
                  {estimate.decorTotal > 0 && (
                    <Row
                      label="Room décor & furniture"
                      value={estimate.decorTotal}
                    />
                  )}
                  <div style={styles.divider} />
                  <Row label="Subtotal" value={estimate.subtotal} bold />
                  <Row
                    label="Design & Consultation (8%)"
                    value={estimate.designFee}
                  />
                  <Row label="GST (18%)" value={estimate.gst} />
                </div>

                {/* Grand total */}
                <div style={styles.grandTotalBox}>
                  <span style={styles.grandTotalLabel}>Estimated Total</span>
                  <span style={styles.grandTotalVal}>
                    {formatCurrency(estimate.grandTotal)}
                  </span>
                </div>

                {/* Disclaimer */}
                <div style={styles.disclaimer}>
                  <Info size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    This is an indicative estimate. Actual costs may vary
                    ±10-15% based on site conditions, design complexity, and
                    material availability.
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={shareOnWhatsApp}
                  style={styles.whatsappBtn}
                  className="calc-wa-btn"
                >
                  <Send size={16} />
                  <span>Share Quote on WhatsApp</span>
                </button>

                <button
                  onClick={() => navigate('/')}
                  style={styles.browseBtn}
                  className="calc-browse-btn"
                >
                  <ArrowRight size={16} />
                  <span>Browse Our Furniture</span>
                </button>
              </>
            ) : (
              <p style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                Select valid options to see estimate.
              </p>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

// ── Reusable breakdown row ───────────────────────────────────────────────────
function Row({ label, value, bold }) {
  return (
    <div style={styles.breakdownRow}>
      <span
        style={{
          ...styles.breakdownLabel,
          fontWeight: bold ? 600 : 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...styles.breakdownVal,
          fontWeight: bold ? 700 : 500,
        }}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════════════════════
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'hsl(36,33%,97%)',
    padding: '2rem 2rem 5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },

  /* Back */
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    background: 'none',
    border: '1px solid hsl(40,13%,88%)',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-body)',
    color: 'hsl(40,9%,11%)',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    transition: 'all .2s ease',
  },

  /* Header */
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'hsl(34,40%,64%,0.12)',
    color: 'hsl(34,40%,52%)',
    padding: '0.35rem 1rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  headerTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
    lineHeight: 1.2,
    marginBottom: '0.75rem',
  },
  headerAccent: {
    color: 'hsl(34,40%,52%)',
  },
  headerSub: {
    fontSize: '1rem',
    color: 'hsl(40,4%,43%)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },

  /* Category Grid Large (Step 1) - Managed in CSS */
  catGridLarge: {},
  catCardLarge: {},
  catCardContent: {
    position: 'relative',
    zIndex: 10,
    color: '#fff',
    paddingTop: '1rem',
  },
  catCardIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    marginBottom: '1.25rem',
  },
  catCardTitleLarge: {},
  catCardDescLarge: {},

  /* Main grid */
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    alignItems: 'start',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  estimateCol: {
    position: 'sticky',
    top: '5rem',
  },

  /* Cards */
  card: {
    backgroundColor: '#fff',
    border: '1px solid hsl(40,13%,88%)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(30,29,27,0.03)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
  },
  cardTitle: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
    fontFamily: 'var(--font-heading)',
  },

  /* Slider */
  sliderRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.75rem',
  },
  sliderVal: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
    fontFamily: 'var(--font-heading)',
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    color: 'hsl(40,4%,43%)',
    marginTop: '0.5rem',
  },

  /* Config buttons */
  configGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  configBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    border: '1.5px solid hsl(40,13%,88%)',
    backgroundColor: '#fff',
    fontSize: '0.82rem',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    color: 'hsl(40,9%,11%)',
    cursor: 'pointer',
    transition: 'all .2s ease',
  },
  configBtnActive: {
    borderColor: 'hsl(34,40%,64%)',
    backgroundColor: 'hsl(34,40%,64%,0.08)',
    fontWeight: 600,
  },
  configCheck: {
    color: 'hsl(34,40%,52%)',
  },
  designRoomBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    marginTop: '1.5rem',
    padding: '0.85rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1E1D1B',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  /* Quality cards */
  qualityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  qualityCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem 1rem',
    borderRadius: '10px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all .2s ease',
    textAlign: 'left',
    fontFamily: 'var(--font-body)',
    background: '#fff',
  },
  qualityTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
  },
  qualityDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  qualityLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
  },
  qualityRate: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'hsl(40,9%,11%)',
    marginBottom: '0.75rem',
  },
  qualityRateUnit: {
    fontSize: '0.7rem',
    fontWeight: 400,
    color: 'hsl(40,4%,43%)',
    marginLeft: '2px',
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
    fontSize: '0.72rem',
    color: 'hsl(40,4%,43%)',
    lineHeight: 1.4,
  },

  /* Add-ons */
  addonHint: {
    marginLeft: 'auto',
    fontSize: '0.7rem',
    color: 'hsl(40,4%,43%)',
    fontStyle: 'italic',
  },
  addonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
  },
  addonBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid',
    cursor: 'pointer',
    transition: 'all .2s ease',
    fontFamily: 'var(--font-body)',
    textAlign: 'left',
    background: '#fff',
  },
  addonCheckbox: {
    flexShrink: 0,
  },
  addonChecked: {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    backgroundColor: 'hsl(34,40%,64%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addonUnchecked: {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    border: '2px solid hsl(40,13%,88%)',
  },
  addonInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  addonLabel: {
    fontSize: '0.82rem',
    fontWeight: 500,
    color: 'hsl(40,9%,11%)',
  },
  addonPrice: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'hsl(34,40%,52%)',
  },

  /* Estimate panel */
  estimateCard: {
    backgroundColor: '#fff',
    border: '1px solid hsl(40,13%,88%)',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(30,29,27,0.06)',
  },
  estimateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid hsl(40,13%,88%)',
    backgroundColor: 'hsl(40,20%,94%)',
    color: 'hsl(40,9%,11%)',
  },
  estimateTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
  },

  /* Breakdown */
  breakdownSection: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  breakdownLabel: {
    fontSize: '0.78rem',
    color: 'hsl(40,4%,43%)',
    lineHeight: 1.4,
    flex: 1,
  },
  breakdownVal: {
    fontSize: '0.82rem',
    color: 'hsl(40,9%,11%)',
    fontFamily: 'var(--font-heading)',
    whiteSpace: 'nowrap',
  },
  divider: {
    height: '1px',
    backgroundColor: 'hsl(40,13%,88%)',
    margin: '0.25rem 0',
  },

  /* Grand total */
  grandTotalBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'hsl(34,40%,64%,0.08)',
    borderTop: '2px solid hsl(34,40%,64%)',
  },
  grandTotalLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  grandTotalVal: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
    fontFamily: 'var(--font-heading)',
  },

  /* Disclaimer */
  disclaimer: {
    display: 'flex',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    fontSize: '0.7rem',
    color: 'hsl(40,4%,43%)',
    lineHeight: 1.5,
    borderTop: '1px solid hsl(40,13%,88%)',
  },

  /* CTA buttons */
  whatsappBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    width: 'calc(100% - 3rem)',
    margin: '0 1.5rem',
    padding: '0.85rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all .2s ease',
    marginTop: '0.25rem',
  },
  browseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: 'calc(100% - 3rem)',
    margin: '0.75rem 1.5rem 1.5rem',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1.5px solid hsl(40,13%,88%)',
    backgroundColor: 'transparent',
    color: 'hsl(40,9%,11%)',
    fontSize: '0.82rem',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all .2s ease',
  },

  /* Room Decor Grid (Apartment) */
  decorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  decorCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
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
    backgroundColor: 'hsl(34,40%,64%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  decorImage: {
    width: '100%',
    height: '120px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'hsl(40,20%,94%)',
  },
  decorInfo: {
    padding: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  decorTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  decorLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
  },
  decorDesc: {
    fontSize: '0.7rem',
    color: 'hsl(40,4%,43%)',
    lineHeight: 1.4,
    margin: 0,
  },
  decorPrice: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
    marginTop: '0.25rem',
  },
};
