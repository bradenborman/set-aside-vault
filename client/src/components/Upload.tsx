import { useState, useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import type { Collection } from '../types';
import { uploadImages } from '../services/api';
import './Upload.css';

interface UploadProps {
  onUploadComplete: (collection: Collection) => void;
  onUploadError: (error: Error) => void;
}

export const Upload = ({ onUploadComplete, onUploadError }: UploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): boolean => {
    setValidationError('');
    
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setValidationError(`${file.name} is not an image file`);
        return false;
      }
    }
    
    return true;
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (validateFiles(files)) {
      setSelectedFiles(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(event.dataTransfer.files);
    if (validateFiles(files)) {
      setSelectedFiles(files);
    }
  };

  const handleClearSelection = () => {
    setSelectedFiles([]);
    setValidationError('');
    setUploadSuccess(false);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    try {
      const collection = await uploadImages(selectedFiles);
      setUploadSuccess(true);
      setIsUploading(false);
      
      // Call the callback with the result
      onUploadComplete(collection);
      
      // Clear selection after successful upload
      setTimeout(() => {
        handleClearSelection();
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadError(errorMessage);
      setIsUploading(false);
      
      // Call the error callback
      onUploadError(error instanceof Error ? error : new Error(errorMessage));
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-container">
      <div
        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="upload-input"
        />
        
        <div className="upload-content">
          <p className="upload-icon">📁</p>
          <p className="upload-text">
            Drag and drop images here, or click to browse
          </p>
          <p className="upload-hint">Only image files are accepted</p>
        </div>
      </div>

      {validationError && (
        <div className="upload-error">
          <p>❌ {validationError}</p>
        </div>
      )}

      {uploadError && (
        <div className="upload-error">
          <p>❌ {uploadError}</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="upload-success">
          <p>✅ Upload completed successfully!</p>
        </div>
      )}

      {isUploading && (
        <div className="upload-progress">
          <div className="progress-spinner"></div>
          <p>Uploading {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}...</p>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files ({selectedFiles.length})</h3>
          <ul className="file-list">
            {selectedFiles.map((file, index) => (
              <li key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </li>
            ))}
          </ul>
          <div className="upload-actions">
            <button onClick={handleClearSelection} className="btn-secondary">
              Clear Selection
            </button>
            <button 
              onClick={handleUpload} 
              className="btn-primary"
              disabled={isUploading}
            >
              <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
