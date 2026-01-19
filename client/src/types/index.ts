// Type definitions for Set-Aside-Vault

export type AspectRatio = 'square' | 'portrait' | 'landscape';

export interface Item {
  id: string;
  url: string;
  filename: string;
  uploadedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  items: Item[];
  createdAt: Date;
  coverPhoto?: string; // URL of the cover photo for the collection
  aspectRatio: AspectRatio; // Display aspect ratio for items in this collection
}
