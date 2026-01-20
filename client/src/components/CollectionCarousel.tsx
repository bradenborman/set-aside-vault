import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Collection } from '../types';
import './CollectionCarousel.css';

interface CollectionCarouselProps {
  collections: Collection[];
}

export const CollectionCarousel = ({ collections }: CollectionCarouselProps) => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  if (collections.length === 0) {
    return (
      <div className="carousel-empty">
        <p className="empty-icon">🖼️</p>
        <p className="empty-text">No collections yet. Upload some images to get started!</p>
      </div>
    );
  }

  // Duplicate collections for infinite scroll effect
  const duplicatedCollections = [...collections, ...collections, ...collections];

  // Calculate stats
  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount ?? col.items.length), 0);
  const storiesCount = 3; // TODO: Get from actual stories data

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Optional: Add logic to navigate between collections on swipe
    if (isLeftSwipe || isRightSwipe) {
      // Swipe detected - could add navigation logic here
      console.log(isLeftSwipe ? 'Swiped left' : 'Swiped right');
    }

    setIsPaused(false);
  };

  return (
    <>
      <div className="stats-dashboard">
        <div className="stat-item">
          <span className="stat-number">{collections.length}</span>
          <span className="stat-label">Collections</span>
        </div>
        <div className="stat-divider">•</div>
        <div className="stat-item">
          <span className="stat-number">{totalItems}</span>
          <span className="stat-label">Items</span>
        </div>
        <div className="stat-divider">•</div>
        <div className="stat-item">
          <span className="stat-number">{storiesCount}</span>
          <span className="stat-label">Stories</span>
        </div>
      </div>

      <div className="carousel-container">
        <div 
          className={`carousel-track ${isPaused ? 'paused' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {duplicatedCollections.map((collection, index) => (
            <div
              key={`${collection.id}-${index}`}
              className="carousel-item"
              onClick={() => navigate(`/collection/${collection.id}`)}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={collection.coverPhoto || collection.items[0]?.url}
                  alt={collection.name}
                  className="carousel-image"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{collection.name}</h3>
                  <p className="carousel-count">
                    {collection.itemCount ?? collection.items.length} {(collection.itemCount ?? collection.items.length) === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
