import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DesignSlider.css';

const slides = [
  {
    id: 1,
    image: '/design_furniture.jpg',
    label: 'DESIGN',
    text: 'Furniture Starting From ₹3,000 Only',
  },
  {
    id: 2,
    image: '/manufacturing_ui.jpg',
    label: 'MANUFACTURING',
    text: 'Crafted by Master Woodworkers',
  },
  {
    id: 3,
    image: '/delivery_ui.jpg',
    label: 'DELIVERY',
    text: 'White-Glove Delivery to Your Door',
  },
  {
    id: 4,
    image: '/assembler_ui.jpg',
    label: 'ASSEMBLY',
    text: 'Professional Assembly Included',
  },
  {
    id: 5,
    image: '/happy_living.jpg',
    label: 'HAPPY LIVING',
    text: 'Live Better, Live Efive',
  },
];

const AUTOPLAY_DELAY = 4000;

export default function DesignSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!isPaused) startTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const goTo = (index) => {
    setCurrent(index);
    // Reset timer on manual navigation
    if (!isPaused) startTimer();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section className="ds-section">
      {/* Section header */}
      <div className="ds-header">
        <span className="ds-eyebrow">THE EFIVE JOURNEY</span>
        <h2 className="ds-title">Design</h2>
        <div className="ds-title-line" />
      </div>

      {/* Slider */}
      <div
        className="ds-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress bar */}
        <div className="ds-progress-bar">
          <div
            className="ds-progress-fill"
            style={{
              animationDuration: `${AUTOPLAY_DELAY}ms`,
              animationPlayState: isPaused ? 'paused' : 'running',
              // Reset on slide change
              key: current,
            }}
          />
        </div>

        {/* Track */}
        <div
          className="ds-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="ds-slide" key={slide.id}>
              <img
                src={slide.image}
                alt={slide.label}
                className="ds-slide-img"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="ds-slide-vignette" />
              <div className="ds-slide-content">
                <span className="ds-slide-label">{slide.label}</span>
                <h3 className="ds-slide-text">{slide.text}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          className="ds-arrow ds-arrow--prev"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          className="ds-arrow ds-arrow--next"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="ds-dots" role="tablist">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              className={`ds-dot ${i === current ? 'ds-dot--active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide: ${slide.label}`}
            />
          ))}
        </div>

        {/* Pause indicator */}
        {isPaused && <div className="ds-paused-badge">⏸</div>}
      </div>
    </section>
  );
}
