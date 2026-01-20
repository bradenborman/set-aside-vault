import { useState } from 'react';
import type { AspectRatio } from '../types';
import './Admin.css';

type ActionType = 'collections' | 'stories' | null;
type WizardStep = 'selector' | 'actions' | 'new-collection';

interface CollectionFormData {
  name: string;
  aspectRatio: AspectRatio;
  coverPhoto: File | null;
  metadata: Record<string, string>;
}

export const Admin = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('selector');
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [collectionForm, setCollectionForm] = useState<CollectionFormData>({
    name: '',
    aspectRatio: 'square',
    coverPhoto: null,
    metadata: {},
  });
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMetadataValue] = useState('');

  const handleSelectAction = (action: ActionType) => {
    setSelectedAction(action);
    setCurrentStep('actions');
  };

  const handleBackToSelector = () => {
    setCurrentStep('selector');
    setSelectedAction(null);
  };

  const handleBackToActions = () => {
    setCurrentStep('actions');
    // Reset form
    setCollectionForm({
      name: '',
      aspectRatio: 'square',
      coverPhoto: null,
      metadata: {},
    });
    setCoverPhotoPreview(null);
    setNewMetadataKey('');
    setNewMetadataValue('');
  };

  const handleNewCollection = () => {
    setCurrentStep('new-collection');
  };

  const handleAddMetadata = () => {
    if (newMetadataKey.trim() && newMetadataValue.trim()) {
      setCollectionForm({
        ...collectionForm,
        metadata: {
          ...collectionForm.metadata,
          [newMetadataKey]: newMetadataValue,
        },
      });
      setNewMetadataKey('');
      setNewMetadataValue('');
    }
  };

  const handleRemoveMetadata = (key: string) => {
    const newMetadata = { ...collectionForm.metadata };
    delete newMetadata[key];
    setCollectionForm({
      ...collectionForm,
      metadata: newMetadata,
    });
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCollectionForm({
        ...collectionForm,
        coverPhoto: file,
      });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setCoverPhotoPreview(previewUrl);
    }
  };

  const handleRemoveCoverPhoto = () => {
    setCollectionForm({
      ...collectionForm,
      coverPhoto: null,
    });
    if (coverPhotoPreview) {
      URL.revokeObjectURL(coverPhotoPreview);
      setCoverPhotoPreview(null);
    }
  };

  const handleSubmitCollection = () => {
    // TODO: Submit to backend
    console.log('Creating collection:', collectionForm);
    alert(`Collection "${collectionForm.name}" created!\n\nAspect Ratio: ${collectionForm.aspectRatio}\nCover Photo: ${collectionForm.coverPhoto?.name || 'None'}\nMetadata: ${Object.keys(collectionForm.metadata).length} fields`);
    handleBackToActions();
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
        {currentStep === 'selector' && (
          <div className="action-selector">
            <h2 className="selector-title">What would you like to manage?</h2>
            <div className="selector-grid">
              <button 
                className="selector-btn selector-btn-primary"
                onClick={() => handleSelectAction('collections')}
              >
                <span className="selector-label">Collections & Items</span>
              </button>
              <button 
                className="selector-btn"
                onClick={() => handleSelectAction('stories')}
              >
                <span className="selector-label">Stories</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 'actions' && (
          <div className="action-panel">
            <button 
              className="back-btn"
              onClick={handleBackToSelector}
            >
              ← Back
            </button>

            {selectedAction === 'collections' && (
              <div className="action-content">
                {/* Create Section */}
                <div className="admin-section">
                  <h3 className="section-title">Create</h3>
                  <div className="create-hierarchy">
                    <button className="create-btn" onClick={handleNewCollection}>
                      ➕ Collection
                    </button>
                    <div className="create-child">
                      <span className="hierarchy-arrow">↳</span>
                      <button className="create-btn create-btn-child" onClick={handleNewItem}>
                        ➕ Item
                      </button>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Manage Section */}
                <div className="admin-section">
                  <h3 className="section-title">Manage</h3>
                  
                  <div className="manage-group">
                    <h4 className="manage-subtitle">Collections</h4>
                    <div className="manage-buttons">
                      <button className="manage-btn" onClick={handleEditCollection}>
                        ✏️ Edit
                      </button>
                      <button className="manage-btn manage-btn-delete" onClick={handleDeleteCollection}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <div className="manage-group">
                    <h4 className="manage-subtitle">Items</h4>
                    <div className="manage-buttons">
                      <button className="manage-btn" onClick={handleEditItem}>
                        ✏️ Edit
                      </button>
                      <button className="manage-btn manage-btn-delete" onClick={handleRemoveItem}>
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedAction === 'stories' && (
              <div className="action-content">
                {/* Create Section */}
                <div className="admin-section">
                  <h3 className="section-title">Create</h3>
                  <button className="create-btn" onClick={handleNewStory}>
                    ➕ Story
                  </button>
                </div>

                <div className="section-divider"></div>

                {/* Manage Section */}
                <div className="admin-section">
                  <h3 className="section-title">Manage</h3>
                  <div className="manage-group">
                    <h4 className="manage-subtitle">Stories</h4>
                    <div className="manage-buttons">
                      <button className="manage-btn" onClick={handleEditStory}>
                        ✏️ Edit
                      </button>
                      <button className="manage-btn manage-btn-delete" onClick={handleDeleteStory}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 'new-collection' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Create New Collection</h2>

            <div className="wizard-form">
              {/* Collection Name */}
              <div className="form-group">
                <label className="form-label">Collection Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Baseball Cards, Pokemon Collection"
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                />
              </div>

              {/* Aspect Ratio */}
              <div className="form-group">
                <label className="form-label">Aspect Ratio *</label>
                <p className="form-help">How should items be displayed in the gallery?</p>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="aspectRatio"
                      value="square"
                      checked={collectionForm.aspectRatio === 'square'}
                      onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                    />
                    <span className="radio-text">Square (1:1) - Memorabilia, figures</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="aspectRatio"
                      value="portrait"
                      checked={collectionForm.aspectRatio === 'portrait'}
                      onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                    />
                    <span className="radio-text">Portrait (2:3) - Trading cards</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="aspectRatio"
                      value="landscape"
                      checked={collectionForm.aspectRatio === 'landscape'}
                      onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                    />
                    <span className="radio-text">Landscape (3:2) - Photos</span>
                  </label>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="form-group">
                <label className="form-label">Cover Photo *</label>
                <p className="form-help">Required - shown in sidebar and collection list</p>
                
                {!coverPhotoPreview ? (
                  <input
                    type="file"
                    className="form-input-file"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    required
                  />
                ) : (
                  <div className="cover-photo-preview">
                    <img 
                      src={coverPhotoPreview} 
                      alt="Cover preview" 
                      className="preview-image"
                    />
                    <div className="preview-overlay">
                      <p className="preview-filename">{collectionForm.coverPhoto?.name}</p>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={handleRemoveCoverPhoto}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="form-group">
                <label className="form-label">Metadata *</label>
                <p className="form-help">Required - add at least one custom field (description, tags, etc.)</p>
                
                {/* Existing metadata */}
                {Object.keys(collectionForm.metadata).length > 0 && (
                  <div className="metadata-list">
                    {Object.entries(collectionForm.metadata).map(([key, value]) => (
                      <div key={key} className="metadata-item">
                        <div className="metadata-item-content">
                          <span className="metadata-item-key">{key}:</span>
                          <span className="metadata-item-value">{value}</span>
                        </div>
                        <button
                          type="button"
                          className="metadata-item-remove"
                          onClick={() => handleRemoveMetadata(key)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new metadata */}
                <div className="metadata-add">
                  <input
                    type="text"
                    className="form-input form-input-inline"
                    placeholder="Field name (e.g., Description)"
                    value={newMetadataKey}
                    onChange={(e) => setNewMetadataKey(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input form-input-inline"
                    placeholder="Value"
                    value={newMetadataValue}
                    onChange={(e) => setNewMetadataValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-add-metadata"
                    onClick={handleAddMetadata}
                    disabled={!newMetadataKey.trim() || !newMetadataValue.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleBackToActions}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={handleSubmitCollection}
                  disabled={!collectionForm.name.trim() || !collectionForm.coverPhoto || Object.keys(collectionForm.metadata).length === 0}
                >
                  Create Collection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
