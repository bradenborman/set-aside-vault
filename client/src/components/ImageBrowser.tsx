import { useState, useEffect } from 'react';
import './ImageBrowser.css';

interface MediaFile {
  filename: string;
  size: number;
  createdAt: string;
  url: string;
}

interface ImageBrowserProps {
  onSelect?: (filename: string) => void;
  onClose?: () => void;
  selectedFilename?: string;
}

export const ImageBrowser = ({ onSelect, onClose, selectedFilename }: ImageBrowserProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(selectedFilename || null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedForDeletion, setSelectedForDeletion] = useState<Set<string>>(new Set());
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    loadUnusedMedia();
  }, []);

  const loadUnusedMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/media/unused');
      if (!response.ok) {
        throw new Error('Failed to load media');
      }
      const data = await response.json();
      setMediaFiles(data);
    } catch (error) {
      console.error('Failed to load unused media:', error);
      alert('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFiles = async () => {
    if (selectedForDeletion.size === 0) {
      alert('Please select files to delete');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedForDeletion.size} file(s)? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch('/api/media/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Array.from(selectedForDeletion)),
      });

      if (!response.ok) {
        throw new Error('Failed to delete files');
      }

      const result = await response.json();
      alert(`Successfully deleted ${result.deletedCount} file(s)`);
      
      // Reload media library
      setSelectedForDeletion(new Set());
      setDeleteMode(false);
      await loadUnusedMedia();
    } catch (error) {
      console.error('Failed to delete files:', error);
      alert('Failed to delete files. Please try again.');
    }
  };

  const toggleDeleteSelection = (filename: string) => {
    const newSelection = new Set(selectedForDeletion);
    if (newSelection.has(filename)) {
      newSelection.delete(filename);
    } else {
      newSelection.add(filename);
    }
    setSelectedForDeletion(newSelection);
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (filename: string) => {
    setSelectedImage(filename);
    if (onSelect) {
      onSelect(filename);
    }
  };

  const handleImageHover = (url: string) => {
    setPreviewImage(url);
  };

  const handleImageLeave = () => {
    setPreviewImage(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="image-browser">
      <div className="image-browser-header">
        <h3>Media Library</h3>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div className="image-browser-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by filename..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="control-buttons">
          <span className="file-count">
            {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
          </span>
          {!deleteMode ? (
            <button
              className="btn-delete-mode"
              onClick={() => setDeleteMode(true)}
              disabled={filteredFiles.length === 0}
            >
              🗑️ Delete Files
            </button>
          ) : (
            <>
              <button
                className="btn-delete-confirm"
                onClick={handleDeleteFiles}
                disabled={selectedForDeletion.size === 0}
              >
                Delete Selected ({selectedForDeletion.size})
              </button>
              <button
                className="btn-cancel-delete"
                onClick={() => {
                  setDeleteMode(false);
                  setSelectedForDeletion(new Set());
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="image-browser-loading">
          <p>Loading media library...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="image-browser-empty">
          <p>
            {searchTerm
              ? 'No files match your search'
              : 'No unused media files found. Upload some files first!'}
          </p>
        </div>
      ) : (
        <div className="image-browser-grid">
          {filteredFiles.map((file) => (
            <div
              key={file.filename}
              className={`image-browser-item ${selectedImage === file.filename ? 'selected' : ''} ${deleteMode && selectedForDeletion.has(file.filename) ? 'marked-for-deletion' : ''}`}
              onClick={() => deleteMode ? toggleDeleteSelection(file.filename) : handleImageClick(file.filename)}
              onMouseEnter={() => !deleteMode && handleImageHover(file.url)}
              onMouseLeave={handleImageLeave}
            >
              <div className="image-browser-thumbnail">
                <img src={file.url} alt={file.filename} loading="lazy" />
              </div>
              <div className="image-browser-info">
                <p className="image-filename" title={file.filename}>
                  {file.filename}
                </p>
                <p className="image-size">{formatFileSize(file.size)}</p>
              </div>
              {deleteMode && selectedForDeletion.has(file.filename) && (
                <div className="delete-indicator">✓</div>
              )}
              {!deleteMode && selectedImage === file.filename && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      )}

      {previewImage && (
        <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" />
        </div>
      )}
    </div>
  );
};
