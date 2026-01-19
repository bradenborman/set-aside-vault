import { useState } from 'react';
import './Admin.css';

type ActionType = 'collections' | 'stories' | null;

export const Admin = () => {
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);

  // TODO: Implement handleNewCollection
  const handleNewCollection = () => {
    alert('New Collection clicked');
    console.log('New Collection clicked');
  };

  // TODO: Implement handleEditCollection
  const handleEditCollection = () => {
    alert('Edit Collection clicked');
    console.log('Edit Collection clicked');
  };

  // TODO: Implement handleDeleteCollection
  const handleDeleteCollection = () => {
    alert('Delete Collection clicked');
    console.log('Delete Collection clicked');
  };

  // TODO: Implement handleNewItem
  const handleNewItem = () => {
    alert('New Item clicked');
    console.log('New Item clicked');
  };

  // TODO: Implement handleEditItem
  const handleEditItem = () => {
    alert('Edit Item clicked');
    console.log('Edit Item clicked');
  };

  // TODO: Implement handleRemoveItem
  const handleRemoveItem = () => {
    alert('Remove Item clicked');
    console.log('Remove Item clicked');
  };

  // TODO: Implement handleNewStory
  const handleNewStory = () => {
    alert('New Story clicked');
    console.log('New Story clicked');
  };

  // TODO: Implement handleEditStory
  const handleEditStory = () => {
    alert('Edit Story clicked');
    console.log('Edit Story clicked');
  };

  // TODO: Implement handleDeleteStory
  const handleDeleteStory = () => {
    alert('Delete Story clicked');
    console.log('Delete Story clicked');
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        {!selectedAction ? (
          <div className="action-selector">
            <h2 className="selector-title">What would you like to manage?</h2>
            <div className="selector-grid">
              <button 
                className="selector-btn selector-btn-primary"
                onClick={() => setSelectedAction('collections')}
              >
                <span className="selector-label">Collections & Items</span>
              </button>
              <button 
                className="selector-btn"
                onClick={() => setSelectedAction('stories')}
              >
                <span className="selector-label">Stories</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="action-panel">
            <button 
              className="back-btn"
              onClick={() => setSelectedAction(null)}
            >
              ← Back
            </button>

            {selectedAction === 'collections' && (
              <div className="action-content">
                <div className="hierarchy-section">
                  <h3 className="hierarchy-title">Collections</h3>
                  <div className="action-buttons-grid">
                    <button className="action-btn" onClick={handleNewCollection}>
                      ➕ New
                    </button>
                    <button className="action-btn" onClick={handleEditCollection}>
                      ✏️ Edit
                    </button>
                    <button className="action-btn action-btn-delete" onClick={handleDeleteCollection}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                <div className="hierarchy-divider"></div>

                <div className="hierarchy-section hierarchy-section-nested">
                  <h3 className="hierarchy-title">Items</h3>
                  <p className="hierarchy-subtitle">Items belong to collections</p>
                  <div className="action-buttons-grid">
                    <button className="action-btn" onClick={handleNewItem}>
                      ➕ New
                    </button>
                    <button className="action-btn" onClick={handleEditItem}>
                      ✏️ Edit
                    </button>
                    <button className="action-btn action-btn-delete" onClick={handleRemoveItem}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedAction === 'stories' && (
              <div className="action-content">
                <h2 className="panel-title">Manage Stories</h2>
                <div className="action-buttons-grid">
                  <button className="action-btn" onClick={handleNewStory}>
                    ➕ New
                  </button>
                  <button className="action-btn" onClick={handleEditStory}>
                    ✏️ Edit
                  </button>
                  <button className="action-btn action-btn-delete" onClick={handleDeleteStory}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
