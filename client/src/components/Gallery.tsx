import { useState, useRef, useEffect } from 'react';
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
  const [panelPosition, setPanelPosition] = useState<'left' | 'right'>('right');
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastScrollY = useRef<number>(0);

  // Clear spotlight when collection changes
  useEffect(() => {
    setSpotlightId(null);
  }, [collectionId]);

  // Clear spotlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!spotlightId) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      // If user scrolls more than 50px, clear spotlight
      if (scrollDelta > 50) {
        setSpotlightId(null);
      }
    };

    if (spotlightId) {
      lastScrollY.current = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [spotlightId]);

  // Determine if metadata panel should be on left or right
  useEffect(() => {
    if (spotlightId) {
      // Wait a bit for scroll animation to complete, then calculate position
      setTimeout(() => {
        const cardElement = cardRefs.current[spotlightId];
        if (cardElement) {
          const rect = cardElement.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          // Store the card's position after scroll
          setCardPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          });
          
          // If card is in the right half of the viewport, show panel on left
          if (rect.left > viewportWidth / 2) {
            setPanelPosition('left');
          } else {
            setPanelPosition('right');
          }
        }
      }, 350); // Slightly longer than the scroll delay
    } else {
      setCardPosition(null);
    }
  }, [spotlightId]);

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
    const cardElement = cardRefs.current[itemId];
    
    if (spotlightId === itemId) {
      setSpotlightId(null); // Deselect if clicking the same card
    } else {
      // If there's already a spotlight, clear it first
      if (spotlightId) {
        setSpotlightId(null);
        // Wait a moment before spotlighting the new card
        setTimeout(() => {
          // Scroll the card into view smoothly before spotlighting
          if (cardElement) {
            cardElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
            
            // Delay the spotlight effect to let scroll complete
            setTimeout(() => {
              setSpotlightId(itemId);
            }, 300);
          } else {
            setSpotlightId(itemId);
          }
        }, 100);
      } else {
        // No existing spotlight, proceed normally
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          
          // Delay the spotlight effect to let scroll complete
          setTimeout(() => {
            setSpotlightId(itemId);
          }, 300);
        } else {
          setSpotlightId(itemId);
        }
      }
    }
  };

  // Find the spotlighted item for metadata display
  const spotlightedItem = spotlightId 
    ? displayCollections.flatMap(c => c.items).find(item => item.id === spotlightId)
    : null;

  return (
    <div className={`gallery ${spotlightId ? 'has-spotlight-active' : ''}`}>
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
                ref={(el) => { cardRefs.current[item.id] = el; }}
                className={`image-card ${spotlightId === item.id ? 'spotlight' : ''} ${spotlightId && spotlightId !== item.id ? 'dimmed' : ''}`}
                onClick={() => handleCardClick(item.id)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="image"
                  loading="lazy"
                />
                <p className="image-filename">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Metadata panel for spotlighted item */}
      {spotlightedItem && cardPosition && (() => {
        return (
          <div 
            className={`metadata-card metadata-card-${panelPosition}`}
            style={{
              position: 'fixed',
              top: cardPosition.top + 'px',
              left: panelPosition === 'right' 
                ? (cardPosition.left + cardPosition.width + 16) + 'px'
                : (cardPosition.left - cardPosition.width - 16) + 'px',
              width: cardPosition.width + 'px',
              height: cardPosition.height + 'px',
            }}
          >
            <button 
              className={`metadata-close metadata-close-${panelPosition}`}
              onClick={() => setSpotlightId(null)}
              aria-label="Close"
            >
              {panelPosition === 'right' ? '«' : '»'}
            </button>
            <div className="metadata-content">
              <h4 className="metadata-title">{spotlightedItem.title}</h4>
              
              {/* Dynamic metadata fields only */}
              {spotlightedItem.metadata && Object.entries(spotlightedItem.metadata).map(([key, value]) => (
                <div key={key} className="metadata-field">
                  <span className="metadata-label">{key}</span>
                  <p className="metadata-value">{value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
