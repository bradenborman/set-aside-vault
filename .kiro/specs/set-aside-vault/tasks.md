# Implementation Plan: Set-Aside-Vault

## Overview

This implementation plan tracks the development of the Set-Aside-Vault personal image gallery application. The current phase focuses on a polished React/TypeScript frontend with comprehensive features including gallery display, collection management, admin panel with full CRUD operations, and stories functionality.

## Completed Tasks

### Phase 1: Frontend Development with Mock Data

- [x] 1. Initialize React + TypeScript + Vite client project
- [x] 2. Define TypeScript type definitions with flexible metadata
- [x] 3. Create API service with mock data (5 collections, 32 items)
- [x] 4. Implement Gallery component with responsive grid
- [x] 5. Implement spotlight effect with smooth scroll-to-center
- [x] 6. Implement metadata panel with dynamic field display
- [x] 7. Implement visual effects (gradients, animations)
- [x] 8. Implement sidebar navigation with active states
- [x] 9. Implement routing (React Router DOM)
- [x] 10. Implement Collection Carousel for home page
- [x] 11. Implement Stats Dashboard
- [x] 12. Implement Stories component
- [x] 13. Implement Admin Panel structure (2-step workflow)
- [x] 14. Implement Create Collection Wizard
- [x] 15. Implement Create Item Wizard
- [x] 16. Implement Create Story Wizard
- [x] 17. Implement Edit Wizards (Collection, Item, Story)
- [x] 18. Implement Delete Wizards (Collection, Item, Story)
- [x] 19. Implement styling system (slate/charcoal theme)
- [x] 20. Implement image previews in all forms

## Current Status

**Phase 1 Complete:** Frontend with mock data, full UI, comprehensive admin panel

**What Works:**
- Gallery with spotlight effect and metadata panel
- Collection carousel and stats dashboard
- Sidebar navigation
- Complete admin CRUD wizards
- Stories page
- Professional styling throughout

**What's Stubbed:**
- All admin operations (console.log + alert)
- No data persistence
- No backend API calls

## Remaining Tasks

### Phase 2: Backend Integration (In Progress)

#### Database & Infrastructure (Complete)
- [x] 21. Configure MySQL database connection
- [x] 22. Create database schema (collections, items, stories tables)
- [x] 23. Create JPA entities (Collection, Item, Story, AspectRatio)
- [x] 24. Configure local storage path (volume-uploads-local)

#### Collection Management
- [x] 25. Implement Create Collection
  - [x] 25.1 Create CollectionDTO and request/response models
  - [x] 25.2 Create CollectionService with create logic
  - [x] 25.3 Implement cover photo upload to storage
  - [x] 25.4 Create REST endpoint POST /api/collections
  - [x] 25.5 Add validation (name required, aspect ratio, cover photo)
  - [x] 25.6 Update frontend API service to call endpoint
  - [x] 25.7 Connect Create Collection wizard to real API

- [x] 26. Implement Get Collections
  - [x] 26.1 Create CollectionService.findAll() method
  - [x] 26.2 Create REST endpoint GET /api/collections
  - [x] 26.3 Update frontend to fetch real collections on load
  - [x] 26.4 Update sidebar to display real collections

- [x] 27. Implement Get Single Collection
  - [x] 27.1 Create CollectionService.findById() method
  - [x] 27.2 Create REST endpoint GET /api/collections/{id}
  - [x] 27.3 Update frontend collection detail view

- [x] 28. Implement Update Collection
  - [x] 28.1 Create CollectionService.update() method
  - [x] 28.2 Handle cover photo replacement logic
  - [x] 28.3 Create REST endpoint PUT /api/collections/{id}
  - [x] 28.4 Load existing data in Edit Collection wizard
  - [x] 28.5 Connect Edit Collection wizard to real API

- [x] 29. Implement Delete Collection
  - [x] 29.1 Create CollectionService.delete() method
  - [x] 29.2 Handle cascade delete or orphan items logic
  - [x] 29.3 Delete associated cover photo from storage
  - [x] 29.4 Create REST endpoint DELETE /api/collections/{id}
  - [x] 29.5 Connect Delete Collection wizard to real API

#### Item Management
- [x] 30. Implement Create Item
  - [x] 30.1 Create ItemDTO and request/response models
  - [x] 30.2 Create ItemService with create logic
  - [x] 30.3 Implement item image upload to storage
  - [x] 30.4 Create REST endpoint POST /api/items
  - [x] 30.5 Add validation (collection, title, image required)
  - [x] 30.6 Update frontend API service to call endpoint
  - [x] 30.7 Connect Create Item wizard to real API

- [x] 31. Implement Get Items
  - [x] 31.1 Create ItemService.findByCollectionId() method
  - [x] 31.2 Create REST endpoint GET /api/collections/{id}/items
  - [x] 31.3 Create REST endpoint GET /api/items (all items)
  - [x] 31.4 Update frontend Gallery to fetch real items

- [x] 32. Implement Get Single Item
  - [x] 32.1 Create ItemService.findById() method
  - [x] 32.2 Create REST endpoint GET /api/items/{id}
  - [x] 32.3 Update frontend item detail view

- [x] 33. Implement Update Item
  - [x] 33.1 Create ItemService.update() method
  - [x] 33.2 Handle image replacement logic
  - [x] 33.3 Create REST endpoint PUT /api/items/{id}
  - [x] 33.4 Load existing data in Edit Item wizard
  - [x] 33.5 Connect Edit Item wizard to real API

- [x] 34. Implement Delete Item
  - [x] 34.1 Create ItemService.delete() method
  - [x] 34.2 Delete associated image from storage
  - [x] 34.3 Create REST endpoint DELETE /api/items/{id}
  - [x] 34.4 Connect Delete Item wizard to real API

#### Story Management
- [ ] 35. Implement Create Story
  - [ ] 35.1 Create StoryDTO and request/response models
  - [ ] 35.2 Create StoryService with create logic
  - [ ] 35.3 Implement cover image upload to storage (optional)
  - [ ] 35.4 Create REST endpoint POST /api/stories
  - [ ] 35.5 Add validation (title, content required)
  - [ ] 35.6 Update frontend API service to call endpoint
  - [ ] 35.7 Connect Create Story wizard to real API

- [ ] 36. Implement Get Stories
  - [ ] 36.1 Create StoryService.findAll() method
  - [ ] 36.2 Create REST endpoint GET /api/stories
  - [ ] 36.3 Update frontend Stories page to fetch real stories

- [ ] 37. Implement Update Story
  - [ ] 37.1 Create StoryService.update() method
  - [ ] 37.2 Handle cover image replacement logic
  - [ ] 37.3 Create REST endpoint PUT /api/stories/{id}
  - [ ] 37.4 Load existing data in Edit Story wizard
  - [ ] 37.5 Connect Edit Story wizard to real API

- [ ] 38. Implement Delete Story
  - [ ] 38.1 Create StoryService.delete() method
  - [ ] 38.2 Delete associated cover image from storage
  - [ ] 38.3 Create REST endpoint DELETE /api/stories/{id}
  - [ ] 38.4 Connect Delete Story wizard to real API

#### Image Serving
- [x] 39. Implement Image Serving Endpoint
  - [x] 39.1 Create StorageService for file operations
  - [x] 39.2 Create REST endpoint GET /api/images/{filename}
  - [x] 39.3 Add proper content-type headers
  - [x] 39.4 Handle file not found errors
  - [x] 39.5 Update frontend to use real image URLs

#### Configuration & Deployment
- [ ] 40. Configure CORS for frontend-backend communication
- [ ] 41. Add global exception handling (@ControllerAdvice)
- [ ] 42. Add request/response logging
- [ ] 43. Test Railway deployment with real database
- [ ] 44. Verify volume mount and file uploads on Railway

### Phase 3: Enhancements (Future)

#### Mobile & Responsive Design
- [x] 45. Implement Mobile/Responsive Layout
  - [x] 45.1 Make sidebar responsive (hamburger menu on mobile)
  - [x] 45.2 Optimize gallery grid for mobile viewports
  - [x] 45.3 Adjust spotlight effect for touch devices
  - [x] 45.4 Make metadata panel mobile-friendly
  - [x] 45.5 Optimize admin forms for mobile screens
  - [x] 45.6 Make collection carousel touch-friendly
  - [x] 45.7 Add mobile-specific navigation patterns
  - [x] 45.8 Test and optimize for tablet sizes
  - [x] 45.9 Add touch gestures (swipe, pinch-to-zoom)
  - [x] 45.10 Optimize image loading for mobile networks

#### Additional Enhancements
- [ ] 46. Database persistence
- [ ] 47. Advanced features (search, bulk ops, image editing)
- [ ] 48. UX improvements (keyboard nav, drag-drop, undo/redo)

## Technical Debt / TODOs

1. Item image preview should match target collection's aspect ratio
2. Edit wizards need to load existing data from backend
3. Add proper error handling and retry logic
4. Add loading states during API calls
5. Implement optimistic UI updates
6. Add image optimization (lazy loading, compression, thumbnails)
7. Improve accessibility (ARIA labels, keyboard navigation)
8. Add virtual scrolling for large collections
9. Add comprehensive test coverage
10. Google Analytics 


## Phase 4: Item Categories Feature

- [x] 46. Implement Item Categories
  - [x] 46.1 Update TypeScript types
    - [x] 46.1.1 Add optional `itemCategories?: string[]` to Collection interface
    - [x] 46.1.2 Add optional `category?: string` to Item interface
  - [x] 46.2 Update Backend Models
    - [x] 46.2.1 Add itemCategories field to Collection entity (JSON column)
    - [x] 46.2.2 Add category field to Item entity (String column)
    - [x] 46.2.3 Update database schema migration
  - [x] 46.3 Update Create Collection Wizard
    - [x] 46.3.1 Add "Item Categories" section to form (optional)
    - [x] 46.3.2 Implement add/remove category UI (similar to metadata)
    - [x] 46.3.3 Validate category names (non-empty, unique)
    - [x] 46.3.4 Update CollectionFormData to include itemCategories
    - [x] 46.3.5 Pass itemCategories to backend API
  - [x] 46.4 Update Edit Collection Wizard
    - [x] 46.4.1 Load existing itemCategories from collection
    - [x] 46.4.2 Allow adding/removing categories
    - [x] 46.4.3 Update backend API call with modified categories
  - [x] 46.5 Update Create Item Wizard
    - [x] 46.5.1 Check if selected collection has itemCategories
    - [x] 46.5.2 Show category dropdown if categories exist
    - [x] 46.5.3 Make category selection optional
    - [x] 46.5.4 Update ItemFormData to include category
    - [x] 46.5.5 Pass category to backend API
  - [x] 46.6 Update Edit Item Wizard
    - [x] 46.6.1 Load existing category from item
    - [x] 46.6.2 Show category dropdown based on collection's categories
    - [x] 46.6.3 Allow changing or removing category
    - [x] 46.6.4 Update backend API call with modified category
  - [x] 46.7 Update Gallery Display
    - [x] 46.7.1 Group items by category within collection
    - [x] 46.7.2 Add category section headers in gallery
    - [x] 46.7.3 Show uncategorized items in separate section
    - [x] 46.7.4 Maintain existing spotlight and metadata functionality
  - [x] 46.8 Backend API Updates
    - [x] 46.8.1 Update CollectionDTO to include itemCategories
    - [x] 46.8.2 Update ItemDTO to include category
    - [x] 46.8.3 Update CollectionService create/update methods
    - [x] 46.8.4 Update ItemService create/update methods
    - [x] 46.8.5 Update response mapping to include new fields

## Phase 5: Media Library Feature

- [-] 47. Implement Media Library with Bulk Upload and Browse
  - [x] 47.1 Backend: Bulk Upload Endpoint
    - [x] 47.1.1 Create POST /api/media/bulk endpoint to accept multiple files
    - [x] 47.1.2 Store uploaded files in volume with unique filenames
    - [x] 47.1.3 Return list of uploaded filenames
  - [x] 47.2 Backend: Media Library Management
    - [x] 47.2.1 Create GET /api/media/unused endpoint to list files in volume not referenced in database
    - [x] 47.2.2 Query database for all filenames in use (items and collection cover photos)
    - [x] 47.2.3 Compare volume files against database references
    - [x] 47.2.4 Return list of unused media files with metadata (filename, size, upload date)
  - [x] 47.3 Frontend: Bulk Upload UI
    - [x] 47.3.1 Add "Media Library" section to Admin panel
    - [x] 47.3.2 Create bulk upload component with drag-and-drop support
    - [x] 47.3.3 Show upload progress for multiple files
    - [x] 47.3.4 Display success/error messages for each file
  - [ ] 47.4 Frontend: Image Browser Component
    - [ ] 47.4.1 Create reusable ImageBrowser component
    - [ ] 47.4.2 Fetch and display unused images in grid layout
    - [ ] 47.4.3 Add image preview on hover/click
    - [ ] 47.4.4 Add search/filter functionality
    - [ ] 47.4.5 Implement image selection (single select)
  - [ ] 47.5 Update Create Collection Wizard
    - [ ] 47.5.1 Add toggle between "Upload New" and "Browse Library"
    - [ ] 47.5.2 Integrate ImageBrowser for library selection
    - [ ] 47.5.3 Update API call to use selected library image or new upload
  - [ ] 47.6 Update Edit Collection Wizard
    - [ ] 47.6.1 Add toggle between "Upload New" and "Browse Library"
    - [ ] 47.6.2 Integrate ImageBrowser for library selection
    - [ ] 47.6.3 Update API call to use selected library image or new upload
  - [ ] 47.7 Update Create Item Wizard
    - [ ] 47.7.1 Add toggle between "Upload New" and "Browse Library"
    - [ ] 47.7.2 Integrate ImageBrowser for library selection
    - [ ] 47.7.3 Update API call to use selected library image or new upload
  - [ ] 47.8 Update Edit Item Wizard
    - [ ] 47.8.1 Add toggle between "Upload New" and "Browse Library"
    - [ ] 47.8.2 Integrate ImageBrowser for library selection
    - [ ] 47.8.3 Update API call to use selected library image or new upload
  - [ ] 47.9 Backend: Update Create/Update Endpoints
    - [ ] 47.9.1 Modify collection endpoints to accept either file upload or existing filename
    - [ ] 47.9.2 Modify item endpoints to accept either file upload or existing filename
    - [ ] 47.9.3 Add validation to ensure selected library file exists
  - [ ] 47.10 Media Library Cleanup
    - [ ] 47.10.1 Add DELETE /api/media/{filename} endpoint for unused files
    - [ ] 47.10.2 Add bulk delete functionality for multiple unused files
    - [ ] 47.10.3 Add confirmation dialog before deletion
