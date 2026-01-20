import { useNavigate } from 'react-router-dom';
import type { Collection } from '../types';
import './CollectionCarousel.css';

interface CollectionCarouselProps {
  collections: Collection[];
}

export const CollectionCarousel = ({ collections }: CollectionCarouselProps) => {
  const navigate = useNavigate();

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
        <div className="carousel-track">
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
