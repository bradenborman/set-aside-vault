import type { Collection } from '../types';

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
        filename: 'vintage-baseball-card.jpg',
        uploadedAt: new Date('2026-01-15'),
        description: 'Rare vintage baseball card from the 1950s featuring a legendary player.',
        condition: 'Near Mint',
        price: 125.00,
        acquisitionDate: new Date('2025-12-10'),
        tags: ['vintage', 'rare', '1950s'],
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=900&fit=crop',
        filename: 'rookie-card.jpg',
        uploadedAt: new Date('2026-01-15'),
        description: 'Rookie card from 2020 season. Great investment piece.',
        condition: 'Mint',
        price: 89.99,
        tags: ['rookie', 'modern', 'investment'],
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=900&fit=crop',
        filename: 'baseball-collection.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-4',
        url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&h=900&fit=crop',
        filename: 'hall-of-fame-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-5',
        url: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=900&fit=crop',
        filename: 'all-star-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-6',
        url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=900&fit=crop',
        filename: 'mvp-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-7',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=900&fit=crop',
        filename: 'world-series-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-8',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=900&fit=crop',
        filename: 'legend-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-9',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=900&fit=crop',
        filename: 'pitcher-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-10',
        url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&h=900&fit=crop',
        filename: 'slugger-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-11',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=900&fit=crop',
        filename: 'gold-glove-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-12',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=900&fit=crop',
        filename: 'cy-young-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-13',
        url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=900&fit=crop',
        filename: 'silver-slugger-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-14',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=900&fit=crop',
        filename: 'championship-card.jpg',
        uploadedAt: new Date('2026-01-15'),
      },
      {
        id: '1-15',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=900&fit=crop',
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
        filename: 'signed-ball.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=600&fit=crop',
        filename: 'autograph-bat.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-3',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop',
        filename: 'signed-jersey.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-4',
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=600&fit=crop',
        filename: 'autograph-glove.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-5',
        url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=600&fit=crop',
        filename: 'signed-helmet.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-6',
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=600&fit=crop',
        filename: 'autograph-photo.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-7',
        url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=600&fit=crop',
        filename: 'signed-cap.jpg',
        uploadedAt: new Date('2026-01-16'),
      },
      {
        id: '2-8',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=600&fit=crop',
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
        filename: 'barn-sunset.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop',
        filename: 'tractor.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-3',
        url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop',
        filename: 'wheat-field.jpg',
        uploadedAt: new Date('2026-01-17'),
      },
      {
        id: '3-4',
        url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=600&fit=crop',
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
        filename: 'action-figure-1.jpg',
        uploadedAt: new Date('2026-01-18'),
      },
      {
        id: '4-2',
        url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
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
        filename: 'pikachu-card.jpg',
        uploadedAt: new Date('2026-01-19'),
      },
      {
        id: '5-2',
        url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
        filename: 'charizard-card.jpg',
        uploadedAt: new Date('2026-01-19'),
      },
      {
        id: '5-3',
        url: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=600&h=600&fit=crop',
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
      filename: file.name,
      uploadedAt: new Date(),
    })),
  };
  
  return newCollection;
};
