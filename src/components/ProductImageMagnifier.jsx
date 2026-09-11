import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ProductImageMagnifier({ 
  src, 
  alt, 
  zoomLevel = 2.5, 
  lensSize = 250, 
  imageStyle = {} 
}) {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const [bgSize, setBgSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if the device is touch-based (mobile)
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleMouseEnter = () => {
    if (isMobile || !isImageLoaded || !imgRef.current) return;
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setShowLens(false);
  };

  const handleMouseMove = (e) => {
    if (isMobile || !isImageLoaded || !imgRef.current || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Cursor position relative to container
    let x = e.clientX - left;
    let y = e.clientY - top;

    const img = imgRef.current;
    const containerAspect = width / height;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let renderedWidth, renderedHeight;
    if (imgAspect > containerAspect) {
      // Letterboxed (bars top/bottom)
      renderedWidth = width;
      renderedHeight = width / imgAspect;
    } else {
      // Pillarboxed (bars left/right)
      renderedHeight = height;
      renderedWidth = height * imgAspect;
    }

    const offsetX = (width - renderedWidth) / 2;
    const offsetY = (height - renderedHeight) / 2;

    // Coordinate relative to the actual rendered image pixels
    const imgX = x - offsetX;
    const imgY = y - offsetY;

    // Hide lens if cursor is in the letterbox area
    if (imgX < 0 || imgY < 0 || imgX > renderedWidth || imgY > renderedHeight) {
      setShowLens(false);
      return;
    } else {
      setShowLens(true);
    }

    // Clamp lens position inside container so it doesn't leak out visually
    const minX = lensSize / 2;
    const maxX = width - lensSize / 2;
    const minY = lensSize / 2;
    const maxY = height - lensSize / 2;
    const clampedLensX = Math.max(minX, Math.min(x, maxX));
    const clampedLensY = Math.max(minY, Math.min(y, maxY));
    
    setLensPos({ x: clampedLensX, y: clampedLensY });

    // Background size calculation
    setBgSize({
      width: renderedWidth * zoomLevel,
      height: renderedHeight * zoomLevel
    });

    // Background position: center the exact pixel under cursor into the middle of the lens
    const bgPosX = -(imgX * zoomLevel) + (lensSize / 2);
    const bgPosY = -(imgY * zoomLevel) + (lensSize / 2);

    setBgPos({ x: bgPosX, y: bgPosY });
  };

  const handleImageClick = () => {
    if (isMobile) {
      setIsFullScreen(true);
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="product-magnifier-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleImageClick}
        style={{ position: 'relative', width: '100%', height: '100%', cursor: isMobile ? 'zoom-in' : 'crosshair', overflow: 'hidden' }}
      >
        <img 
          ref={imgRef}
          src={src} 
          alt={alt}
          onLoad={handleImageLoad}
          style={{ ...imageStyle, display: 'block', width: '100%', height: '100%' }}
          loading="lazy"
          decoding="async"
        />

        {!isMobile && showLens && (
          <div 
            className="product-magnifier-lens"
            style={{
              position: 'absolute',
              left: `${lensPos.x - lensSize / 2}px`,
              top: `${lensPos.y - lensSize / 2}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              backgroundImage: `url("${src}")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${bgSize.width}px ${bgSize.height}px`,
              backgroundPosition: `${bgPos.x}px ${bgPos.y}px`,
              borderRadius: '50%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 0 2px rgba(255,255,255,0.85), inset 0 0 20px rgba(0,0,0,0.1)',
              pointerEvents: 'none',
              zIndex: 20,
              backgroundColor: '#fff',
              willChange: 'left, top, background-position',
            }}
          />
        )}
      </div>

      {isMobile && isFullScreen && (
        <div className="product-magnifier-fullscreen" onClick={() => setIsFullScreen(false)}>
          <button 
            className="product-magnifier-close" 
            onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
            aria-label="Close fullscreen image"
          >
            <X size={28} />
          </button>
          <div className="product-magnifier-fullscreen-content">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  );
}
