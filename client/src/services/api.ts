import type { Collection } from '../types';

// API base URL - use proxy in development, direct path in production
const API_BASE_URL = '/api';

export const fetchCollections = async (): Promise<Collection[]> => {
  const response = await fetch(`${API_BASE_URL}/collections`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  
  const collectionsData = await response.json();
  
  // Transform backend response to frontend Collection type
  return collectionsData.map((col: any) => ({
    id: col.id,
    name: col.name,
    createdAt: new Date(col.createdAt),
    coverPhoto: col.coverPhoto ? `/api/images/${col.coverPhoto}` : undefined,
    aspectRatio: col.aspectRatio.toLowerCase() as 'square' | 'portrait' | 'landscape',
    metadata: col.metadata,
    items: [], // Items will be loaded separately when viewing a collection
    itemCount: col.itemCount, // Item count from backend
  }));
};

export const uploadImages = async (files: File[]): Promise<Collection> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create mock collection from uploaded files
  const newCollection: Collection = {
    id: Date.now().toString(),
    name: `Collection ${Date.now()}`,
    createdAt: new Date(),
    coverPhoto: files.length > 0 ? URL.createObjectURL(files[0]) : undefined,
    aspectRatio: 'square', // Default to square, will be configurable in wizard
    items: files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension for title
      filename: file.name,
      uploadedAt: new Date(),
    })),
  };
  
  return newCollection;
};

export interface CreateCollectionData {
  name: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  metadata?: Record<string, string>;
}

export const createCollection = async (
  data: CreateCollectionData,
  coverPhoto: File
): Promise<Collection> => {
  const formData = new FormData();
  
  // Add JSON data as a string
  formData.append('data', JSON.stringify(data));
  
  // Add cover photo file
  formData.append('coverPhoto', coverPhoto);
  
  const response = await fetch(`${API_BASE_URL}/collections`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to create collection' }));
    throw new Error(error.error || 'Failed to create collection');
  }
  
  const collectionResponse = await response.json();
  
  // Transform backend response to frontend Collection type
  return {
    id: collectionResponse.id,
    name: collectionResponse.name,
    createdAt: new Date(collectionResponse.createdAt),
    coverPhoto: collectionResponse.coverPhoto ? `/api/images/${collectionResponse.coverPhoto}` : undefined,
    aspectRatio: collectionResponse.aspectRatio.toLowerCase() as 'square' | 'portrait' | 'landscape',
    metadata: collectionResponse.metadata,
    items: [], // New collection has no items yet
    itemCount: collectionResponse.itemCount || 0,
  };
};

