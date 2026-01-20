import type { Collection } from '../types';

// API base URL - use proxy in development, direct path in production
const API_BASE_URL = '/api';


// Mock data for development
const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Baseball Cards',
    createdAt: new Date('2026-01-15'),
    coverPhoto: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=400&fit=crop',
    aspectRatio: 'portrait',
    items: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=900&fit=crop',
        title: '1950s Vintage Card',
        filename: 'vintage-baseball-card.jpg',
        uploadedAt: new Date('2026-01-15'),
        metadata: {
          'Description': 'Rare vintage baseball card from the 1950s featuring a legendary player.',
          'Condition': 'Near Mint',
          'Price': '$125.00',
          'Acquired': '12/10/2025',
          'Tags': 'vintage, rare, 1950s',
        },
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=900&fit=crop',
        title: '2020 Rookie Card',
        filename: 'rookie-card.jpg',
        uploadedAt: new Date('2026-01-15'),
        metadata: {
          'Description': 'Rookie card from 2020 season. Great investment piece.',
          'Condition': 'Mint',
          'Price': '$89.99',
          'Tags': 'rookie, modern, investment',
        },
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=900&fit=crop',
        title: 'Baseball Collection Set',
        filename: 'baseball-collection.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-4',
        url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&h=900&fit=crop',
        title: 'Hall of Fame Edition',
        filename: 'hall-of-fame-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-5',
        url: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=900&fit=crop',
        title: 'All-Star Player',
        filename: 'all-star-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-6',
        url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=900&fit=crop',
        title: 'MVP Award Winner',
        filename: 'mvp-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-7',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=900&fit=crop',
        title: 'World Series Champion',
        filename: 'world-series-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-8',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=900&fit=crop',
        title: 'Baseball Legend',
        filename: 'legend-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-9',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=900&fit=crop',
        title: 'Star Pitcher',
        filename: 'pitcher-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-10',
        url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&h=900&fit=crop',
        title: 'Power Slugger',
        filename: 'slugger-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-11',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=900&fit=crop',
        title: 'Gold Glove Winner',
        filename: 'gold-glove-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-12',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=900&fit=crop',
        title: 'Cy Young Award',
        filename: 'cy-young-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-13',
        url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=900&fit=crop',
        title: 'Silver Slugger',
        filename: 'silver-slugger-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-14',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=900&fit=crop',
        title: 'Championship Edition',
        filename: 'championship-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-15',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=900&fit=crop',
        title: 'Rare Limited Edition',
        filename: 'rare-edition-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
    ],
  },
  {
    id: '2',
    name: 'Baseball Auto',
    createdAt: new Date('2026-01-16'),
    coverPhoto: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400&h=400&fit=crop',
    aspectRatio: 'square',
    items: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&h=600&fit=crop',
        title: 'Signed Baseball',
        filename: 'signed-ball.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=600&fit=crop',
        title: 'Autographed Bat',
        filename: 'autograph-bat.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-3',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop',
        title: 'Signed Jersey',
        filename: 'signed-jersey.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-4',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=600&fit=crop',
        title: 'Autographed Glove',
        filename: 'autograph-glove.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-5',
        url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=600&fit=crop',
        title: 'Signed Helmet',
        filename: 'signed-helmet.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-6',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=600&fit=crop',
        title: 'Autographed Photo',
        filename: 'autograph-photo.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-7',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=600&fit=crop',
        title: 'Signed Cap',
        filename: 'signed-cap.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-8',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=600&fit=crop',
        title: 'Autographed Cleats',
        filename: 'autograph-cleats.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
    ],
  },
  {
    id: '3',
    name: 'Farm Country',
    createdAt: new Date('2026-01-17'),
    coverPhoto: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
    aspectRatio: 'landscape',
    items: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=600&fit=crop',
        title: 'Barn at Sunset',
        filename: 'barn-sunset.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop',
        title: 'Vintage Tractor',
        filename: 'tractor.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-3',
        url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop',
        title: 'Golden Wheat Field',
        filename: 'wheat-field.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-4',
        url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=600&fit=crop',
        title: 'Country Farmhouse',
        filename: 'farmhouse.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
    ],
  },
  {
    id: '4',
    name: 'SH Figuarts',
    createdAt: new Date('2026-01-18'),
    coverPhoto: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&h=400&fit=crop',
    aspectRatio: 'square',
    items: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=600&h=600&fit=crop',
        title: 'Action Figure Hero',
        filename: 'action-figure-1.jpg',
        uploadedAt: new Date('2026-01-18'),
      },
      {
        id: '4-2',
        url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
        title: 'Figure Collection Display',
        filename: 'figure-collection.jpg',
        uploadedAt: new Date('2026-01-18'),
      },
    ],
  },
  {
    id: '5',
    name: 'Pokemon',
    createdAt: new Date('2026-01-19'),
    coverPhoto: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&h=400&fit=crop',
    aspectRatio: 'portrait',
    items: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=600&h=600&fit=crop',
        title: 'Pikachu Rare Card',
        filename: 'pikachu-card.jpg',
        uploadedAt: new Date('2026-01-19'),
      },
      {
        id: '5-2',
        url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
        title: 'Charizard Holographic',
        filename: 'charizard-card.jpg',
        uploadedAt: new Date('2026-01-19'),
      },
      {
        id: '5-3',
        url: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=600&h=600&fit=crop',
        title: 'Booster Pack Collection',
        filename: 'pokemon-booster.jpg',
        uploadedAt: new Date('2026-01-19'),
      },
    ],
  },
];

export const fetchCollections = async (): Promise<Collection[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return mockCollections;
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
  };
};

