# Implementation Plan: Set-Aside-Vault

## Overview

This implementation plan breaks down the set-aside-vault image gallery application into discrete coding tasks. The approach follows a phased development strategy, starting with the build system setup, then frontend with mock data (Phase 1), and finally backend integration (Phase 2). Each task builds incrementally, ensuring no orphaned code and validating functionality early through tests.

## Tasks

- [x] 1. Set up Gradle multi-module build system
  - Create root build.gradle with basic configuration
  - Create settings.gradle including only 'server' module
  - Create server/build.gradle with Spring Boot plugin and dependencies
  - Add Gradle wrapper files if not present
  - _Requirements: 1.1, 2.1_

- [x] 2. Configure client build integration in Gradle
  - [x] 2.1 Add buildClient task to server/build.gradle
    - Task executes npm install in client directory
    - Task executes npm run build in client directory
    - _Requirements: 2.2_
  
  - [x] 2.2 Add copyClientAssets task to server/build.gradle
    - Copy all files from client/dist to server/src/main/resources/static
    - Copy index.html from client/dist to server/src/main/resources/templates
    - Task depends on buildClient task
    - _Requirements: 1.4, 2.3, 2.4_
  
  - [x] 2.3 Wire copyClientAssets into server build process
    - Make processResources task depend on copyClientAssets
    - _Requirements: 2.1_
  
  - [ ]* 2.4 Write property test for client asset integration
    - **Property 1: Client assets integration**
    - **Validates: Requirements 1.4, 2.3**
    - Generate test files in client/dist, run build, verify files in server/src/main/resources/static
  
  - [ ]* 2.5 Write property test for index.html placement
    - **Property 3: Index.html template placement**
    - **Validates: Requirements 2.4**
    - Verify index.html exists in server/src/main/resources/templates after build

- [ ] 3. Initialize React + TypeScript + Vite client project
  - [x] 3.1 Create client directory and initialize npm project
    - Run npm create vite@latest with React + TypeScript template
    - Configure vite.config.ts with build output directory
    - Add necessary dependencies (react-router-dom if needed)
    - _Requirements: 1.2_
  
  - [~] 3.2 Create TypeScript type definitions
    - Define Image interface (id, url, filename, uploadedAt)
    - Define ImageCollection interface (id, name, images, createdAt)
    - _Requirements: 4.1_
  
  - [~] 3.3 Create API service with mock implementation
    - Implement fetchCollections() returning mock data
    - Implement uploadImages() returning mock success response
    - _Requirements: 4.1, 5.2_

- [ ] 4. Implement Gallery component
  - [~] 4.1 Create Gallery component with props interface
    - Accept collections array as prop
    - Render collections in responsive grid layout
    - Handle loading and empty states
    - _Requirements: 4.1_
  
  - [ ]* 4.2 Write unit tests for Gallery component
    - Test rendering with empty collections
    - Test rendering with multiple collections
    - Test loading state display
    - _Requirements: 4.1_
  
  - [ ]* 4.3 Write property test for complete collection display
    - **Property 5: Complete collection display**
    - **Validates: Requirements 4.1**
    - Generate random collections, verify all rendered in component

- [ ] 5. Implement Upload component
  - [~] 5.1 Create Upload component with file selection UI
    - Implement file input or drag-and-drop interface
    - Add file type validation (images only)
    - Display selected files before upload
    - _Requirements: 5.1_
  
  - [~] 5.2 Implement upload progress and feedback
    - Show upload progress indicator
    - Display success message on completion
    - Display error messages on failure
    - Call onUploadComplete callback with result
    - _Requirements: 5.4_
  
  - [ ]* 5.3 Write unit tests for Upload component
    - Test file selection handling
    - Test file type validation
    - Test error display
    - _Requirements: 5.2_

- [ ] 6. Implement main App component
  - [~] 6.1 Create App component with state management
    - Manage collections state
    - Manage loading and error states
    - Fetch collections on component mount
    - _Requirements: 4.1_
  
  - [~] 6.2 Wire Gallery and Upload components together
    - Pass collections to Gallery component
    - Handle upload completion by refreshing collections
    - _Requirements: 4.1, 5.4_
  
  - [ ]* 6.3 Write integration test for upload-fetch flow
    - Test that upload triggers collection refresh
    - _Requirements: 5.4_

- [~] 7. Checkpoint - Verify frontend builds and runs
  - Run npm run build and verify dist output
  - Run npm run dev and verify app loads in browser
  - Verify mock data displays correctly
  - Ensure all tests pass, ask the user if questions arise

- [ ] 8. Set up Spring Boot server project structure
  - [~] 8.1 Create Spring Boot application main class
    - Add @SpringBootApplication annotation
    - Configure main method
    - _Requirements: 1.3_
  
  - [~] 8.2 Create application.yml configuration
    - Configure server.port with ${PORT:8080}
    - Configure multipart file upload limits (10MB per file, 50MB per request)
    - Configure storage.location with ${STORAGE_PATH:/tmp/uploads}
    - Set timezone to America/Chicago
    - _Requirements: 3.4, 3.5, 5.5_
  
  - [~] 8.3 Create package structure
    - Create controller, service, model, and config packages
    - _Requirements: 1.1_

- [ ] 9. Implement data models and DTOs
  - [~] 9.1 Create ImageDTO class
    - Fields: id, url, filename, uploadedAt
    - Add constructors, getters, setters
    - _Requirements: 4.1_
  
  - [~] 9.2 Create ImageCollectionDTO class
    - Fields: id, name, images (List<ImageDTO>), createdAt
    - Add constructors, getters, setters
    - _Requirements: 4.1_

- [ ] 10. Implement StorageService for file operations
  - [~] 10.1 Create StorageService interface and implementation
    - Implement init() to create storage directory
    - Implement store(MultipartFile) to save file with UUID filename
    - Implement loadAsResource(String filename) to load file
    - Handle IOExceptions appropriately
    - _Requirements: 5.3, 7.1_
  
  - [~] 10.2 Add @PostConstruct init method
    - Call init() on application startup to ensure storage directory exists
    - _Requirements: 7.1_
  
  - [ ]* 10.3 Write unit tests for StorageService
    - Test directory creation
    - Test file storage with mock MultipartFile
    - Test file loading
    - Test error handling for missing files
    - _Requirements: 5.3_
  
  - [ ]* 10.4 Write property test for storage volume persistence
    - **Property 9: Storage volume persistence**
    - **Validates: Requirements 5.3, 7.1, 7.4**
    - Generate random image files, store them, verify files exist in storage directory

- [ ] 11. Implement ImageService for business logic
  - [~] 11.1 Create ImageService interface and implementation
    - Implement getAllCollections() returning List<ImageCollectionDTO>
    - Use ConcurrentHashMap for in-memory collection storage (Phase 1)
    - _Requirements: 4.1_
  
  - [~] 11.2 Implement uploadImages method
    - Accept MultipartFile[] parameter
    - Generate UUID for collection
    - Store each file using StorageService
    - Create ImageCollectionDTO with stored images
    - Add collection to in-memory map
    - Return created collection
    - _Requirements: 5.2, 5.3, 5.5_
  
  - [~] 11.3 Implement loadImageAsResource method
    - Delegate to StorageService.loadAsResource
    - _Requirements: 6.4_
  
  - [ ]* 11.4 Write unit tests for ImageService
    - Test getAllCollections with empty and populated collections
    - Test uploadImages with single file
    - Test uploadImages with multiple files
    - Test error handling for invalid files
    - _Requirements: 4.1, 5.2, 5.5_
  
  - [ ]* 11.5 Write property test for multiple file upload handling
    - **Property 11: Multiple file upload handling**
    - **Validates: Requirements 5.5**
    - Generate random number of valid image files, upload together, verify all stored in same collection

- [ ] 12. Implement ImageController REST endpoints
  - [~] 12.1 Create ImageController class
    - Add @RestController and @RequestMapping("/api/images") annotations
    - Inject ImageService dependency
    - _Requirements: 4.1, 5.2_
  
  - [~] 12.2 Implement GET /api/images/collections endpoint
    - Return ResponseEntity<List<ImageCollectionDTO>>
    - Call imageService.getAllCollections()
    - _Requirements: 4.1_
  
  - [~] 12.3 Implement POST /api/images/upload endpoint
    - Accept @RequestParam("files") MultipartFile[] files
    - Validate files are not empty
    - Call imageService.uploadImages(files)
    - Return ResponseEntity<ImageCollectionDTO> with created collection
    - Handle exceptions and return appropriate error responses
    - _Requirements: 5.2, 5.3, 5.4_
  
  - [~] 12.4 Implement GET /api/images/file/{filename} endpoint
    - Accept @PathVariable String filename
    - Load image using imageService.loadImageAsResource
    - Return ResponseEntity<Resource> with image content
    - Set appropriate Content-Type header
    - Handle FileNotFoundException with 404 response
    - _Requirements: 6.4_
  
  - [ ]* 12.5 Write unit tests for ImageController
    - Test GET /collections returns collections
    - Test POST /upload with valid files
    - Test POST /upload with invalid files returns 400
    - Test GET /file/{filename} returns image
    - Test GET /file/{filename} with missing file returns 404
    - _Requirements: 4.1, 5.2, 6.4_
  
  - [ ]* 12.6 Write property test for unauthenticated access
    - **Property 7: Unauthenticated gallery access**
    - **Property 15: Unauthenticated upload access**
    - **Validates: Requirements 4.4, 9.1, 9.2**
    - Make requests without authentication headers, verify success responses

- [ ] 13. Configure static resource serving
  - [~] 13.1 Create StaticResourceConfiguration class
    - Add @Configuration annotation
    - Implement WebMvcConfigurer interface
    - _Requirements: 6.1_
  
  - [~] 13.2 Configure static resource handlers
    - Override addResourceHandlers method
    - Add handler for /static/** serving from classpath:/static/
    - Add handler for /** serving from classpath:/static/ (for client assets)
    - _Requirements: 6.1, 6.3_
  
  - [~] 13.3 Configure view controller for root path
    - Override addViewControllers method
    - Map "/" to forward to index.html from templates
    - _Requirements: 6.2_
  
  - [ ]* 13.4 Write property test for static asset serving
    - **Property 12: Static asset serving**
    - **Validates: Requirements 6.1, 6.3**
    - Create test files in static directory, request them, verify content returned
  
  - [ ]* 13.5 Write unit test for root path serving
    - Test GET / returns index.html
    - _Requirements: 6.2_

- [ ] 14. Configure CORS for development
  - [~] 14.1 Add CORS configuration to StaticResourceConfiguration
    - Allow origins from localhost:5173 (Vite dev server)
    - Allow all HTTP methods
    - Allow credentials
    - _Requirements: 8.2_

- [ ] 15. Update frontend API service to use real endpoints
  - [~] 15.1 Replace mock implementation with real HTTP calls
    - Implement fetchCollections() calling GET /api/images/collections
    - Implement uploadImages() calling POST /api/images/upload with FormData
    - Handle errors and network failures
    - _Requirements: 4.1, 5.2_
  
  - [ ]* 15.2 Write property test for upload-fetch round trip
    - **Property 10: Upload-fetch round trip**
    - **Validates: Requirements 5.4**
    - Upload random images, immediately fetch collections, verify uploaded images present

- [~] 16. Checkpoint - Test full application locally
  - Run ./gradlew build and verify success
  - Run ./gradlew :server:bootRun
  - Open browser to http://localhost:8080
  - Test gallery display with mock data
  - Test image upload functionality
  - Verify uploaded images appear in gallery
  - Ensure all tests pass, ask the user if questions arise

- [ ] 17. Create Railway deployment configuration
  - [~] 17.1 Create nixpacks.toml file
    - Configure setup phase with jdk21 and nodejs nixPkgs
    - Configure build phase with './gradlew build -x test' command
    - Configure start command with 'java -jar server/build/libs/server.jar'
    - _Requirements: 3.1, 3.2_
  
  - [~] 17.2 Create railway.json file
    - Configure builder as NIXPACKS
    - Configure start command with PORT variable: 'java -Dserver.port=$PORT -jar server/build/libs/server.jar'
    - Configure restart policy
    - _Requirements: 3.3, 3.4_
  
  - [ ]* 17.3 Write unit tests for configuration files
    - Verify nixpacks.toml contains JDK 21
    - Verify railway.json contains correct start command
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 17.4 Write property test for dynamic port binding
    - **Property 4: Dynamic port binding**
    - **Validates: Requirements 3.4**
    - Set PORT environment variable to random valid ports, start server, verify binding

- [ ] 18. Add error handling and validation
  - [~] 18.1 Add file type validation in Upload component
    - Check MIME type is image/*
    - Display error for non-image files
    - _Requirements: 5.2_
  
  - [~] 18.2 Add file size validation in backend
    - Validate against configured limits
    - Return 413 Payload Too Large for oversized files
    - _Requirements: 5.5_
  
  - [~] 18.3 Add global exception handler in Spring Boot
    - Create @ControllerAdvice class
    - Handle IOException, FileNotFoundException, MaxUploadSizeExceededException
    - Return appropriate HTTP status codes and error messages
    - _Requirements: 5.2, 6.4_
  
  - [ ]* 18.4 Write unit tests for error handling
    - Test file type validation rejection
    - Test file size validation rejection
    - Test exception handler responses
    - _Requirements: 5.2_

- [ ] 19. Add persistence testing
  - [ ]* 19.1 Write property test for restart persistence
    - **Property 14: Restart persistence**
    - **Validates: Requirements 7.2**
    - Store random images, simulate service restart (clear in-memory map but keep files), verify files still accessible
    - Note: This test reveals that Phase 1 in-memory storage doesn't persist metadata across restarts (expected limitation)

- [ ] 20. Final integration and polish
  - [~] 20.1 Add loading states and error messages in frontend
    - Show spinner while fetching collections
    - Display error messages for failed uploads
    - Show empty state when no collections exist
    - _Requirements: 4.1, 5.4_
  
  - [~] 20.2 Add basic styling for gallery layout
    - Responsive grid layout for images
    - Hover effects on images
    - Upload button styling
    - _Requirements: 4.2_
  
  - [~] 20.3 Test complete workflow end-to-end
    - Fresh build and deployment
    - Upload multiple collections
    - Verify all images display correctly
    - Test on different screen sizes
    - _Requirements: 4.1, 5.4_

- [~] 21. Final checkpoint - Complete testing
  - Run all unit tests: ./gradlew test and npm test
  - Run all property tests
  - Verify build completes without errors
  - Test local deployment
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Phase 1 focuses on frontend with mock data and basic backend structure
- Phase 2 (future) will add database persistence for metadata
- Property tests validate universal correctness across many inputs
- Unit tests validate specific scenarios and edge cases
- Each task references specific requirements for traceability
- Build system tasks ensure client and server integrate properly
- Checkpoints provide natural break points for validation
