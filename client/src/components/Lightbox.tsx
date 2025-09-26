import React, { useEffect } from 'react';
import './Lightbox.css';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
      navigateImage(1);
    }
  };

  const navigateImage = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      onNavigate(newIndex);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          ×
        </button>
        
        <button 
          className="lightbox-nav lightbox-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            navigateImage(-1);
          }}
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        
        <button 
          className="lightbox-nav lightbox-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            navigateImage(1);
          }}
          disabled={currentIndex === images.length - 1}
        >
          ›
        </button>
        
        <div className="lightbox-image-container">
          <img src={currentImage} alt="Product" />
        </div>
        
        <div className="lightbox-thumbnails">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(index);
              }}
            >
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;