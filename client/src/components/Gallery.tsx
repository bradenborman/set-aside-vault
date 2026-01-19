import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Collection } from '../types';
import './Gallery.css';

interface GalleryProps {
  collections: Collection[];
  loading?: boolean;
  singleCollection?: boolean;
}

export const Gallery = ({ collections, loading = false, singleCollection = false }: GalleryProps) => {
  const { collectionId } = useParams();
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="gallery-loading">
        <p>Loading collections...</p>
      </div>
    );
  }

  // Filter to single collection if viewing individual collection
  const displayCollections = singleCollection && collectionId
    ? collections.filter(c => c.id === collectionId)
    : collections;

  if (displayCollections.length === 0) {
    return (
      <div className="gallery-empty">
        <p>No collections yet. Upload some images to get started!</p>
      </div>
    );
  }

  const handleCardClick = (itemId: string) => {
    if (spotlightId === itemId) {
      setSpotlightId(null); // Deselect if clicking the same card
    } else {
      setSpotlightId(itemId);
    }
  };

  return (
    <div className="gallery">
      {displayCollections.map((collection) => (
        <div key={collection.id} className="collection">
          {!singleCollection && (
            <div className="collection-header">
              <h3 className="collection-name">{collection.name}</h3>
            </div>
          )}
          <div className={`images-grid images-grid-${collection.aspectRatio} ${spotlightId ? 'has-spotlight' : ''}`}>
            {collection.items.map((item) => (
              <div 
                key={item.id} 
                className={`image-card ${spotlightId === item.id ? 'spotlight' : ''} ${spotlightId && spotlightId !== item.id ? 'dimmed' : ''}`}
                onClick={() => handleCardClick(item.id)}
              >
                <img
                  src={item.url}
                  alt={item.filename}
                  className="image"
                  loading="lazy"
                />
                <p className="image-filename">{item.filename}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
