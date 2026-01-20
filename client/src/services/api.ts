import type { Collection, Item } from '../types';

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

export const fetchCollectionById = async (id: string): Promise<Collection> => {
  const response = await fetch(`${API_BASE_URL}/collections/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch collection');
  }
  
  const col = await response.json();
  
  // Fetch items for this collection
  const items = await fetchItemsByCollectionId(id);
  
  // Transform backend response to frontend Collection type
  return {
    id: col.id,
    name: col.name,
    createdAt: new Date(col.createdAt),
    coverPhoto: col.coverPhoto ? `/api/images/${col.coverPhoto}` : undefined,
    aspectRatio: col.aspectRatio.toLowerCase() as 'square' | 'portrait' | 'landscape',
    metadata: col.metadata,
    items: items, // Load items from API
    itemCount: col.itemCount, // Item count from backend
  };
};

export const fetchItemsByCollectionId = async (collectionId: string): Promise<Item[]> => {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/items`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  
  const itemsData = await response.json();
  
  // Transform backend response to frontend Item type
  return itemsData.map((item: any) => ({
    id: item.id,
    collectionId: item.collectionId,
    url: item.url,
    title: item.title,
    filename: item.filename,
    uploadedAt: new Date(item.uploadedAt),
    metadata: item.metadata,
  }));
};

export const fetchAllItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_BASE_URL}/items`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  
  const itemsData = await response.json();
  
  // Transform backend response to frontend Item type
  return itemsData.map((item: any) => ({
    id: item.id,
    collectionId: item.collectionId,
    url: item.url,
    title: item.title,
    filename: item.filename,
    uploadedAt: new Date(item.uploadedAt),
    metadata: item.metadata,
  }));
};

export const fetchItemById = async (id: string): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  
  const item = await response.json();
  
  // Transform backend response to frontend Item type
  return {
    id: item.id,
    collectionId: item.collectionId,
    url: item.url,
    title: item.title,
    filename: item.filename,
    uploadedAt: new Date(item.uploadedAt),
    metadata: item.metadata,
  };
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

export interface CreateItemData {
  collectionId: string;
  title: string;
  metadata?: Record<string, string>;
}

export const createItem = async (
  data: CreateItemData,
  image: File
): Promise<any> => {
  const formData = new FormData();
  
  // Add JSON data as a string
  formData.append('data', JSON.stringify(data));
  
  // Add image file
  formData.append('image', image);
  
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to create item' }));
    throw new Error(error.error || 'Failed to create item');
  }
  
  const itemResponse = await response.json();
  
  // Transform backend response to frontend Item type
  return {
    id: itemResponse.id,
    collectionId: itemResponse.collectionId,
    url: itemResponse.url,
    title: itemResponse.title,
    filename: itemResponse.filename,
    uploadedAt: new Date(itemResponse.uploadedAt),
    metadata: itemResponse.metadata,
  };
};

export interface UpdateCollectionData {
  name: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  metadata?: Record<string, string>;
}

export const updateCollection = async (
  id: string,
  data: UpdateCollectionData,
  coverPhoto?: File
): Promise<Collection> => {
  const formData = new FormData();
  
  // Add JSON data as a string
  formData.append('data', JSON.stringify(data));
  
  // Add cover photo file if provided
  if (coverPhoto) {
    formData.append('coverPhoto', coverPhoto);
  }
  
  const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
    method: 'PUT',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to update collection' }));
    throw new Error(error.error || 'Failed to update collection');
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
    items: [], // Items not included in update response
    itemCount: collectionResponse.itemCount || 0,
  };
};

export interface UpdateItemData {
  collectionId: string;
  title: string;
  metadata?: Record<string, string>;
}

export const updateItem = async (
  id: string,
  data: UpdateItemData,
  image?: File
): Promise<Item> => {
  const formData = new FormData();
  
  // Add JSON data as a string
  formData.append('data', JSON.stringify(data));
  
  // Add image file if provided
  if (image) {
    formData.append('image', image);
  }
  
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'PUT',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to update item' }));
    throw new Error(error.error || 'Failed to update item');
  }
  
  const itemResponse = await response.json();
  
  // Transform backend response to frontend Item type
  return {
    id: itemResponse.id,
    collectionId: itemResponse.collectionId,
    url: itemResponse.url,
    title: itemResponse.title,
    filename: itemResponse.filename,
    uploadedAt: new Date(itemResponse.uploadedAt),
    metadata: itemResponse.metadata,
  };
};

export const deleteCollection = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to delete collection' }));
    throw new Error(error.error || 'Failed to delete collection');
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to delete item' }));
    throw new Error(error.error || 'Failed to delete item');
  }
};
