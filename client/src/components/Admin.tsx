import { useState, useEffect } from 'react';
import type { AspectRatio, Collection } from '../types';
import { createCollection, createItem, fetchCollections } from '../services/api';
import './Admin.css';

type ActionType = 'collections' | 'stories' | null;
type WizardStep = 'selector' | 'actions' | 'new-collection' | 'new-item' | 'edit-collection' | 'delete-collection' | 'edit-item' | 'delete-item' | 'new-story' | 'edit-story' | 'delete-story';

interface CollectionFormData {
  name: string;
  aspectRatio: AspectRatio;
  coverPhoto: File | null;
  metadata: Record<string, string>;
}

interface ItemFormData {
  collectionId: string;
  title: string;
  file: File | null;
  metadata: Record<string, string>;
}

interface StoryFormData {
  title: string;
  content: string;
  coverImage: File | null;
  itemId?: string;
  collectionId?: string;
  metadata: Record<string, string>;
}

export const Admin = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('selector');
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true);
  const [collectionForm, setCollectionForm] = useState<CollectionFormData>({
    name: '',
    aspectRatio: 'square',
    coverPhoto: null,
    metadata: {},
  });
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMetadataValue] = useState('');
  
  const [itemForm, setItemForm] = useState<ItemFormData>({
    collectionId: '',
    title: '',
    file: null,
    metadata: {},
  });
  const [itemImagePreview, setItemImagePreview] = useState<string | null>(null);
  const [itemMetadataKey, setItemMetadataKey] = useState('');
  const [itemMetadataValue, setItemMetadataValue] = useState('');
  
  // For edit/delete operations
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');
  
  const [storyForm, setStoryForm] = useState<StoryFormData>({
    title: '',
    content: '',
    coverImage: null,
    itemId: '',
    collectionId: '',
    metadata: {},
  });
  const [storyCoverPreview, setStoryCoverPreview] = useState<string | null>(null);
  const [storyMetadataKey, setStoryMetadataKey] = useState('');
  const [storyMetadataValue, setStoryMetadataValue] = useState('');

  // Fetch collections on mount
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoadingCollections(true);
      const data = await fetchCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to load collections:', error);
    } finally {
      setLoadingCollections(false);
    }
  };

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
    // Reset collection form
    setCollectionForm({
      name: '',
      aspectRatio: 'square',
      coverPhoto: null,
      metadata: {},
    });
    setCoverPhotoPreview(null);
    setNewMetadataKey('');
    setNewMetadataValue('');
    
    // Reset item form
    setItemForm({
      collectionId: '',
      title: '',
      file: null,
      metadata: {},
    });
    setItemImagePreview(null);
    setItemMetadataKey('');
    setItemMetadataValue('');
    
    // Reset story form
    setStoryForm({
      title: '',
      content: '',
      coverImage: null,
      itemId: '',
      collectionId: '',
      metadata: {},
    });
    setStoryCoverPreview(null);
    setStoryMetadataKey('');
    setStoryMetadataValue('');
    setSelectedStoryId('');
  };

  const handleNewCollection = () => {
    setCurrentStep('new-collection');
  };

  const handleNewItem = () => {
    setCurrentStep('new-item');
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

  const handleAddItemMetadata = () => {
    if (itemMetadataKey.trim() && itemMetadataValue.trim()) {
      setItemForm({
        ...itemForm,
        metadata: {
          ...itemForm.metadata,
          [itemMetadataKey]: itemMetadataValue,
        },
      });
      setItemMetadataKey('');
      setItemMetadataValue('');
    }
  };

  const handleRemoveItemMetadata = (key: string) => {
    const newMetadata = { ...itemForm.metadata };
    delete newMetadata[key];
    setItemForm({
      ...itemForm,
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

  const handleItemImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setItemForm({
        ...itemForm,
        file: file,
      });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setItemImagePreview(previewUrl);
    }
  };

  const handleRemoveItemImage = () => {
    setItemForm({
      ...itemForm,
      file: null,
    });
    if (itemImagePreview) {
      URL.revokeObjectURL(itemImagePreview);
      setItemImagePreview(null);
    }
  };

  const handleStoryCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStoryForm({
        ...storyForm,
        coverImage: file,
      });
      
      const previewUrl = URL.createObjectURL(file);
      setStoryCoverPreview(previewUrl);
    }
  };

  const handleRemoveStoryCover = () => {
    setStoryForm({
      ...storyForm,
      coverImage: null,
    });
    if (storyCoverPreview) {
      URL.revokeObjectURL(storyCoverPreview);
      setStoryCoverPreview(null);
    }
  };

  const handleAddStoryMetadata = () => {
    if (storyMetadataKey.trim() && storyMetadataValue.trim()) {
      setStoryForm({
        ...storyForm,
        metadata: {
          ...storyForm.metadata,
          [storyMetadataKey]: storyMetadataValue,
        },
      });
      setStoryMetadataKey('');
      setStoryMetadataValue('');
    }
  };

  const handleRemoveStoryMetadata = (key: string) => {
    const newMetadata = { ...storyForm.metadata };
    delete newMetadata[key];
    setStoryForm({
      ...storyForm,
      metadata: newMetadata,
    });
  };

  const handleSubmitCollection = async () => {
    try {
      if (!collectionForm.coverPhoto) {
        alert('Cover photo is required');
        return;
      }

      // Call the real API
      const newCollection = await createCollection(
        {
          name: collectionForm.name,
          aspectRatio: collectionForm.aspectRatio,
          metadata: collectionForm.metadata,
        },
        collectionForm.coverPhoto
      );

      console.log('Collection created:', newCollection);
      alert(`Collection "${newCollection.name}" created successfully!`);
      
      // Reload collections to update the dropdown
      await loadCollections();
      
      handleBackToActions();
    } catch (error) {
      console.error('Failed to create collection:', error);
      alert(`Failed to create collection: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmitItem = async () => {
    try {
      if (!itemForm.file) {
        alert('Item image is required');
        return;
      }

      // Call the real API
      const newItem = await createItem(
        {
          collectionId: itemForm.collectionId,
          title: itemForm.title,
          metadata: itemForm.metadata,
        },
        itemForm.file
      );

      console.log('Item created:', newItem);
      alert(`Item "${newItem.title}" created successfully!`);
      handleBackToActions();
    } catch (error) {
      console.error('Failed to create item:', error);
      alert(`Failed to create item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // TODO: Implement handleEditCollection
  const handleEditCollection = () => {
    setCurrentStep('edit-collection');
  };

  // TODO: Implement handleDeleteCollection
  const handleDeleteCollection = () => {
    setCurrentStep('delete-collection');
  };

  // TODO: Implement handleEditItem
  const handleEditItem = () => {
    setCurrentStep('edit-item');
  };

  // TODO: Implement handleRemoveItem
  const handleRemoveItem = () => {
    setCurrentStep('delete-item');
  };

  const handleConfirmDeleteCollection = () => {
    // TODO: Submit to backend
    console.log('Deleting collection:', selectedCollectionId);
    alert(`Collection deleted!`);
    handleBackToActions();
  };

  const handleConfirmDeleteItem = () => {
    // TODO: Submit to backend
    console.log('Deleting item:', selectedItemId);
    alert(`Item deleted!`);
    handleBackToActions();
  };

  const handleUpdateCollection = () => {
    // TODO: Submit to backend
    console.log('Updating collection:', selectedCollectionId, collectionForm);
    alert(`Collection "${collectionForm.name}" updated!`);
    handleBackToActions();
  };

  const handleUpdateItem = () => {
    // TODO: Submit to backend
    console.log('Updating item:', selectedItemId, itemForm);
    alert(`Item "${itemForm.title}" updated!`);
    handleBackToActions();
  };

  // TODO: Implement handleNewStory
  const handleNewStory = () => {
    setCurrentStep('new-story');
  };

  // TODO: Implement handleEditStory
  const handleEditStory = () => {
    setCurrentStep('edit-story');
  };

  // TODO: Implement handleDeleteStory
  const handleDeleteStory = () => {
    setCurrentStep('delete-story');
  };

  const handleSubmitStory = () => {
    // TODO: Submit to backend
    console.log('Creating story:', storyForm);
    alert(`Story "${storyForm.title}" created!`);
    handleBackToActions();
  };

  const handleUpdateStory = () => {
    // TODO: Submit to backend
    console.log('Updating story:', selectedStoryId, storyForm);
    alert(`Story "${storyForm.title}" updated!`);
    handleBackToActions();
  };

  const handleConfirmDeleteStory = () => {
    // TODO: Submit to backend
    console.log('Deleting story:', selectedStoryId);
    alert(`Story deleted!`);
    handleBackToActions();
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

        {currentStep === 'new-item' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Create New Item</h2>

            <div className="wizard-form">
              {/* Collection Selection */}
              <div className="form-group">
                <label className="form-label">Collection *</label>
                <p className="form-help">Select which collection this item belongs to</p>
                <select
                  className="form-input"
                  value={itemForm.collectionId}
                  onChange={(e) => setItemForm({ ...itemForm, collectionId: e.target.value })}
                  required
                >
                  <option value="">-- Select a collection --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Item Title */}
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 1950s Vintage Card, Signed Baseball"
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  required
                />
              </div>

              {/* Item Image */}
              <div className="form-group">
                <label className="form-label">Image *</label>
                <p className="form-help">Required - the main image for this item</p>
                
                {/* TODO: Make preview match the aspect ratio of the selected collection
                     - Look up the collection's aspectRatio from collectionId
                     - Apply appropriate aspect-ratio CSS to preview-image
                     - Square: 1/1, Portrait: 2/3, Landscape: 3/2 */}
                
                {!itemImagePreview ? (
                  <input
                    type="file"
                    className="form-input-file"
                    accept="image/*"
                    onChange={handleItemImageChange}
                    required
                  />
                ) : (
                  <div className="cover-photo-preview">
                    <img 
                      src={itemImagePreview} 
                      alt="Item preview" 
                      className="preview-image"
                    />
                    <div className="preview-overlay">
                      <p className="preview-filename">{itemForm.file?.name}</p>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={handleRemoveItemImage}
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
                <p className="form-help">Required - add at least one field (description, condition, price, etc.)</p>
                
                {/* Existing metadata */}
                {Object.keys(itemForm.metadata).length > 0 && (
                  <div className="metadata-list">
                    {Object.entries(itemForm.metadata).map(([key, value]) => (
                      <div key={key} className="metadata-item">
                        <div className="metadata-item-content">
                          <span className="metadata-item-key">{key}:</span>
                          <span className="metadata-item-value">{value}</span>
                        </div>
                        <button
                          type="button"
                          className="metadata-item-remove"
                          onClick={() => handleRemoveItemMetadata(key)}
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
                    placeholder="Field name (e.g., Description, Condition)"
                    value={itemMetadataKey}
                    onChange={(e) => setItemMetadataKey(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input form-input-inline"
                    placeholder="Value"
                    value={itemMetadataValue}
                    onChange={(e) => setItemMetadataValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-add-metadata"
                    onClick={handleAddItemMetadata}
                    disabled={!itemMetadataKey.trim() || !itemMetadataValue.trim()}
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
                  onClick={handleSubmitItem}
                  disabled={!itemForm.collectionId || !itemForm.title.trim() || !itemForm.file || Object.keys(itemForm.metadata).length === 0}
                >
                  Create Item
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'edit-collection' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Edit Collection</h2>

            <div className="wizard-form">
              {/* Collection Selection */}
              <div className="form-group">
                <label className="form-label">Select Collection *</label>
                <select
                  className="form-input"
                  value={selectedCollectionId}
                  onChange={(e) => {
                    setSelectedCollectionId(e.target.value);
                    // TODO: Load collection data and populate form
                    // For now, just reset the form
                    setCollectionForm({
                      name: '',
                      aspectRatio: 'square',
                      coverPhoto: null,
                      metadata: {},
                    });
                  }}
                  required
                >
                  <option value="">-- Select a collection to edit --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {selectedCollectionId && (
                <>
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
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="aspectRatio"
                          value="square"
                          checked={collectionForm.aspectRatio === 'square'}
                          onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                        />
                        <span className="radio-text">Square (1:1)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="aspectRatio"
                          value="portrait"
                          checked={collectionForm.aspectRatio === 'portrait'}
                          onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                        />
                        <span className="radio-text">Portrait (2:3)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="aspectRatio"
                          value="landscape"
                          checked={collectionForm.aspectRatio === 'landscape'}
                          onChange={(e) => setCollectionForm({ ...collectionForm, aspectRatio: e.target.value as AspectRatio })}
                        />
                        <span className="radio-text">Landscape (3:2)</span>
                      </label>
                    </div>
                  </div>

                  {/* Cover Photo */}
                  <div className="form-group">
                    <label className="form-label">Cover Photo</label>
                    <p className="form-help">Optional - upload new to replace existing</p>
                    
                    {!coverPhotoPreview ? (
                      <input
                        type="file"
                        className="form-input-file"
                        accept="image/*"
                        onChange={handleCoverPhotoChange}
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
                    <label className="form-label">Metadata</label>
                    
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

                    <div className="metadata-add">
                      <input
                        type="text"
                        className="form-input form-input-inline"
                        placeholder="Field name"
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
                      onClick={handleUpdateCollection}
                      disabled={!collectionForm.name.trim()}
                    >
                      Update Collection
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 'delete-collection' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Delete Collection</h2>

            <div className="wizard-form">
              <div className="form-group">
                <label className="form-label">Select Collection to Delete *</label>
                <select
                  className="form-input"
                  value={selectedCollectionId}
                  onChange={(e) => setSelectedCollectionId(e.target.value)}
                  required
                >
                  <option value="">-- Select a collection --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name} ({collection.itemCount ?? collection.items.length} items)
                      </option>
                    ))
                  )}
                </select>
              </div>

              {selectedCollectionId && (
                <div className="delete-warning">
                  <p className="warning-icon">⚠️</p>
                  <h3 className="warning-title">Warning: This action cannot be undone</h3>
                  <p className="warning-text">
                    Deleting this collection will permanently remove it and all items within it.
                    This action is irreversible.
                  </p>
                </div>
              )}

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
                  className="btn-delete-confirm"
                  onClick={handleConfirmDeleteCollection}
                  disabled={!selectedCollectionId}
                >
                  Delete Collection
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'edit-item' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Edit Item</h2>

            <div className="wizard-form">
              {/* Collection Selection */}
              <div className="form-group">
                <label className="form-label">Collection *</label>
                <select
                  className="form-input"
                  value={itemForm.collectionId}
                  onChange={(e) => {
                    setItemForm({ ...itemForm, collectionId: e.target.value });
                    setSelectedItemId(''); // Reset item selection when collection changes
                  }}
                  required
                >
                  <option value="">-- Select a collection --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {itemForm.collectionId && (
                <>
                  {/* Item Selection */}
                  <div className="form-group">
                    <label className="form-label">Select Item *</label>
                    <select
                      className="form-input"
                      value={selectedItemId}
                      onChange={(e) => {
                        setSelectedItemId(e.target.value);
                        // TODO: Load item data and populate form
                        setItemForm({
                          ...itemForm,
                          title: '',
                          file: null,
                          metadata: {},
                        });
                      }}
                      required
                    >
                      <option value="">-- Select an item to edit --</option>
                      <option value="1-1">1950s Vintage Card</option>
                      <option value="1-2">2020 Rookie Card</option>
                      <option value="1-3">Baseball Collection Set</option>
                    </select>
                  </div>

                  {selectedItemId && (
                    <>
                      {/* Item Title */}
                      <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., 1950s Vintage Card"
                          value={itemForm.title}
                          onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                          required
                        />
                      </div>

                      {/* Item Image */}
                      <div className="form-group">
                        <label className="form-label">Image</label>
                        <p className="form-help">Optional - upload new to replace existing</p>
                        
                        {!itemImagePreview ? (
                          <input
                            type="file"
                            className="form-input-file"
                            accept="image/*"
                            onChange={handleItemImageChange}
                          />
                        ) : (
                          <div className="cover-photo-preview">
                            <img 
                              src={itemImagePreview} 
                              alt="Item preview" 
                              className="preview-image"
                            />
                            <div className="preview-overlay">
                              <p className="preview-filename">{itemForm.file?.name}</p>
                              <button
                                type="button"
                                className="btn-remove-photo"
                                onClick={handleRemoveItemImage}
                              >
                                ✕ Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="form-group">
                        <label className="form-label">Metadata</label>
                        
                        {Object.keys(itemForm.metadata).length > 0 && (
                          <div className="metadata-list">
                            {Object.entries(itemForm.metadata).map(([key, value]) => (
                              <div key={key} className="metadata-item">
                                <div className="metadata-item-content">
                                  <span className="metadata-item-key">{key}:</span>
                                  <span className="metadata-item-value">{value}</span>
                                </div>
                                <button
                                  type="button"
                                  className="metadata-item-remove"
                                  onClick={() => handleRemoveItemMetadata(key)}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="metadata-add">
                          <input
                            type="text"
                            className="form-input form-input-inline"
                            placeholder="Field name"
                            value={itemMetadataKey}
                            onChange={(e) => setItemMetadataKey(e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-input form-input-inline"
                            placeholder="Value"
                            value={itemMetadataValue}
                            onChange={(e) => setItemMetadataValue(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn-add-metadata"
                            onClick={handleAddItemMetadata}
                            disabled={!itemMetadataKey.trim() || !itemMetadataValue.trim()}
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
                          onClick={handleUpdateItem}
                          disabled={!itemForm.title.trim()}
                        >
                          Update Item
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 'delete-item' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Delete Item</h2>

            <div className="wizard-form">
              {/* Collection Selection */}
              <div className="form-group">
                <label className="form-label">Collection *</label>
                <select
                  className="form-input"
                  value={itemForm.collectionId}
                  onChange={(e) => {
                    setItemForm({ ...itemForm, collectionId: e.target.value });
                    setSelectedItemId('');
                  }}
                  required
                >
                  <option value="">-- Select a collection --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {itemForm.collectionId && (
                <>
                  <div className="form-group">
                    <label className="form-label">Select Item to Delete *</label>
                    <select
                      className="form-input"
                      value={selectedItemId}
                      onChange={(e) => setSelectedItemId(e.target.value)}
                      required
                    >
                      <option value="">-- Select an item --</option>
                      <option value="1-1">1950s Vintage Card</option>
                      <option value="1-2">2020 Rookie Card</option>
                      <option value="1-3">Baseball Collection Set</option>
                    </select>
                  </div>

                  {selectedItemId && (
                    <div className="delete-warning">
                      <p className="warning-icon">⚠️</p>
                      <h3 className="warning-title">Warning: This action cannot be undone</h3>
                      <p className="warning-text">
                        Deleting this item will permanently remove it from the collection.
                        This action is irreversible.
                      </p>
                    </div>
                  )}
                </>
              )}

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
                  className="btn-delete-confirm"
                  onClick={handleConfirmDeleteItem}
                  disabled={!selectedItemId}
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'new-story' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Create New Story</h2>

            <div className="wizard-form">
              {/* Story Title */}
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., The Day I Found My First Vintage Card"
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  required
                />
              </div>

              {/* Story Content */}
              <div className="form-group">
                <label className="form-label">Story Content *</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell your story..."
                  rows={8}
                  value={storyForm.content}
                  onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                  required
                />
              </div>

              {/* Cover Image */}
              <div className="form-group">
                <label className="form-label">Cover Image</label>
                <p className="form-help">Optional - main image for the story</p>
                
                {!storyCoverPreview ? (
                  <input
                    type="file"
                    className="form-input-file"
                    accept="image/*"
                    onChange={handleStoryCoverChange}
                  />
                ) : (
                  <div className="cover-photo-preview">
                    <img 
                      src={storyCoverPreview} 
                      alt="Story cover preview" 
                      className="preview-image"
                    />
                    <div className="preview-overlay">
                      <p className="preview-filename">{storyForm.coverImage?.name}</p>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={handleRemoveStoryCover}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Link to Item (Optional) */}
              <div className="form-group">
                <label className="form-label">Link to Collection (Optional)</label>
                <p className="form-help">Associate this story with a collection</p>
                <select
                  className="form-input"
                  value={storyForm.collectionId || ''}
                  onChange={(e) => setStoryForm({ ...storyForm, collectionId: e.target.value })}
                >
                  <option value="">-- None --</option>
                  {loadingCollections ? (
                    <option disabled>Loading collections...</option>
                  ) : (
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {storyForm.collectionId && (
                <div className="form-group">
                  <label className="form-label">Link to Specific Item (Optional)</label>
                  <select
                    className="form-input"
                    value={storyForm.itemId || ''}
                    onChange={(e) => setStoryForm({ ...storyForm, itemId: e.target.value })}
                  >
                    <option value="">-- None --</option>
                    <option value="1-1">1950s Vintage Card</option>
                    <option value="1-2">2020 Rookie Card</option>
                    <option value="1-3">Baseball Collection Set</option>
                  </select>
                </div>
              )}

              {/* Metadata */}
              <div className="form-group">
                <label className="form-label">Metadata (Optional)</label>
                <p className="form-help">Add custom fields like tags, category, etc.</p>
                
                {Object.keys(storyForm.metadata).length > 0 && (
                  <div className="metadata-list">
                    {Object.entries(storyForm.metadata).map(([key, value]) => (
                      <div key={key} className="metadata-item">
                        <div className="metadata-item-content">
                          <span className="metadata-item-key">{key}:</span>
                          <span className="metadata-item-value">{value}</span>
                        </div>
                        <button
                          type="button"
                          className="metadata-item-remove"
                          onClick={() => handleRemoveStoryMetadata(key)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="metadata-add">
                  <input
                    type="text"
                    className="form-input form-input-inline"
                    placeholder="Field name (e.g., Category, Tags)"
                    value={storyMetadataKey}
                    onChange={(e) => setStoryMetadataKey(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input form-input-inline"
                    placeholder="Value"
                    value={storyMetadataValue}
                    onChange={(e) => setStoryMetadataValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-add-metadata"
                    onClick={handleAddStoryMetadata}
                    disabled={!storyMetadataKey.trim() || !storyMetadataValue.trim()}
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
                  onClick={handleSubmitStory}
                  disabled={!storyForm.title.trim() || !storyForm.content.trim()}
                >
                  Create Story
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'edit-story' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Edit Story</h2>

            <div className="wizard-form">
              {/* Story Selection */}
              <div className="form-group">
                <label className="form-label">Select Story *</label>
                <select
                  className="form-input"
                  value={selectedStoryId}
                  onChange={(e) => {
                    setSelectedStoryId(e.target.value);
                    // TODO: Load story data and populate form
                    setStoryForm({
                      title: '',
                      content: '',
                      coverImage: null,
                      itemId: '',
                      collectionId: '',
                      metadata: {},
                    });
                  }}
                  required
                >
                  <option value="">-- Select a story to edit --</option>
                  <option value="1">The 1952 Mickey Mantle Find</option>
                  <option value="2">My First Pokemon Card</option>
                  <option value="3">Grandpa's Baseball Collection</option>
                </select>
              </div>

              {selectedStoryId && (
                <>
                  {/* Story Title */}
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Story title"
                      value={storyForm.title}
                      onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Story Content */}
                  <div className="form-group">
                    <label className="form-label">Story Content *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell your story..."
                      rows={8}
                      value={storyForm.content}
                      onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                      required
                    />
                  </div>

                  {/* Cover Image */}
                  <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    <p className="form-help">Optional - upload new to replace existing</p>
                    
                    {!storyCoverPreview ? (
                      <input
                        type="file"
                        className="form-input-file"
                        accept="image/*"
                        onChange={handleStoryCoverChange}
                      />
                    ) : (
                      <div className="cover-photo-preview">
                        <img 
                          src={storyCoverPreview} 
                          alt="Story cover preview" 
                          className="preview-image"
                        />
                        <div className="preview-overlay">
                          <p className="preview-filename">{storyForm.coverImage?.name}</p>
                          <button
                            type="button"
                            className="btn-remove-photo"
                            onClick={handleRemoveStoryCover}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Link to Collection */}
                  <div className="form-group">
                    <label className="form-label">Link to Collection (Optional)</label>
                    <select
                      className="form-input"
                      value={storyForm.collectionId || ''}
                      onChange={(e) => setStoryForm({ ...storyForm, collectionId: e.target.value })}
                    >
                      <option value="">-- None --</option>
                      {loadingCollections ? (
                        <option disabled>Loading collections...</option>
                      ) : (
                        collections.map((collection) => (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {storyForm.collectionId && (
                    <div className="form-group">
                      <label className="form-label">Link to Specific Item (Optional)</label>
                      <select
                        className="form-input"
                        value={storyForm.itemId || ''}
                        onChange={(e) => setStoryForm({ ...storyForm, itemId: e.target.value })}
                      >
                        <option value="">-- None --</option>
                        <option value="1-1">1950s Vintage Card</option>
                        <option value="1-2">2020 Rookie Card</option>
                      </select>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="form-group">
                    <label className="form-label">Metadata</label>
                    
                    {Object.keys(storyForm.metadata).length > 0 && (
                      <div className="metadata-list">
                        {Object.entries(storyForm.metadata).map(([key, value]) => (
                          <div key={key} className="metadata-item">
                            <div className="metadata-item-content">
                              <span className="metadata-item-key">{key}:</span>
                              <span className="metadata-item-value">{value}</span>
                            </div>
                            <button
                              type="button"
                              className="metadata-item-remove"
                              onClick={() => handleRemoveStoryMetadata(key)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="metadata-add">
                      <input
                        type="text"
                        className="form-input form-input-inline"
                        placeholder="Field name"
                        value={storyMetadataKey}
                        onChange={(e) => setStoryMetadataKey(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-input form-input-inline"
                        placeholder="Value"
                        value={storyMetadataValue}
                        onChange={(e) => setStoryMetadataValue(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-add-metadata"
                        onClick={handleAddStoryMetadata}
                        disabled={!storyMetadataKey.trim() || !storyMetadataValue.trim()}
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
                      onClick={handleUpdateStory}
                      disabled={!storyForm.title.trim() || !storyForm.content.trim()}
                    >
                      Update Story
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 'delete-story' && (
          <div className="wizard-panel">
            <button 
              className="back-btn"
              onClick={handleBackToActions}
            >
              ← Back
            </button>

            <h2 className="wizard-title">Delete Story</h2>

            <div className="wizard-form">
              <div className="form-group">
                <label className="form-label">Select Story to Delete *</label>
                <select
                  className="form-input"
                  value={selectedStoryId}
                  onChange={(e) => setSelectedStoryId(e.target.value)}
                  required
                >
                  <option value="">-- Select a story --</option>
                  <option value="1">The 1952 Mickey Mantle Find</option>
                  <option value="2">My First Pokemon Card</option>
                  <option value="3">Grandpa's Baseball Collection</option>
                </select>
              </div>

              {selectedStoryId && (
                <div className="delete-warning">
                  <p className="warning-icon">⚠️</p>
                  <h3 className="warning-title">Warning: This action cannot be undone</h3>
                  <p className="warning-text">
                    Deleting this story will permanently remove it.
                    This action is irreversible.
                  </p>
                </div>
              )}

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
                  className="btn-delete-confirm"
                  onClick={handleConfirmDeleteStory}
                  disabled={!selectedStoryId}
                >
                  Delete Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
