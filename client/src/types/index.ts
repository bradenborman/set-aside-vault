// Type definitions for Set-Aside-Vault

export type AspectRatio = 'square' | 'portrait' | 'landscape';

export interface Item {
  id: string; //will be a UUID
  collectionId?: string; // will link to Collection 
  url: string;
  filename: string;
  uploadedAt: Date;
  description?: string; // Optional description/notes about the item
  tags?: string[]; // Optional tags for categorization
  price?: number; // Optional purchase price
  condition?: string; // Optional condition (e.g., "Mint", "Near Mint", "Good", "Fair")
  acquisitionDate?: Date; // Optional date when item was acquired
}

export interface Collection {
  id: string; //will be a UUID
  name: string;
  description?: string; // Optional description of the collection
  items: Item[];
  createdAt: Date;
  coverPhoto?: string; // URL of the cover photo for the collection
  aspectRatio: AspectRatio; // Display aspect ratio for items in this collection
  tags?: string[]; // Optional tags for categorization
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
