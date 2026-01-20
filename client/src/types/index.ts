// Type definitions for Set-Aside-Vault

export type AspectRatio = 'square' | 'portrait' | 'landscape';

export interface Item {
  // Core fields
  id: string; //will be a UUID
  collectionId?: string; // will link to Collection 
  url: string;
  title: string; // Display title for the item
  filename: string; // Original filename
  uploadedAt: Date;
  
  // Flexible metadata for displayable fields (description, price, condition, etc.)
  metadata?: Record<string, string>;
}

export interface Collection {
  // Core fields
  id: string; //will be a UUID
  name: string;
  items: Item[];
  createdAt: Date;
  coverPhoto?: string; // URL of the cover photo for the collection
  aspectRatio: AspectRatio; // Display aspect ratio for items in this collection
  
  // Flexible metadata for displayable fields (description, tags, etc.)
  metadata?: Record<string, string>;
}
export interface Story {
  id: string; //will be a UUID
  title: string;
  content: string; // The story text/narrative
  createdAt: Date;
  updatedAt?: Date;
  itemId?: string; // Optional reference to a specific item this story is about
  collectionId?: string; // Optional reference to a collection this story is about
  coverImage?: string; // Optional cover image URL
  tags?: string[]; // Optional tags for categorization
}
