package com.vault.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vault.dto.CollectionResponse;
import com.vault.dto.CreateCollectionRequest;
import com.vault.dto.UpdateCollectionRequest;
import com.vault.entity.Collection;
import com.vault.repository.CollectionRepository;
import com.vault.repository.ItemRepository;
import com.vault.validation.CollectionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private CollectionValidator collectionValidator;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public CollectionResponse createCollection(String requestData, MultipartFile coverPhoto) {
        try {
            // Parse JSON request data
            CreateCollectionRequest request = objectMapper.readValue(requestData, CreateCollectionRequest.class);

            // Validate request
            collectionValidator.validateCreateRequest(request, coverPhoto);

            // Create new collection entity
            Collection collection = new Collection();
            collection.setName(request.getName());
            collection.setAspectRatio(request.getAspectRatio());
            collection.setMetadata(request.getMetadata());

            // Handle cover photo upload
            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                String filename = storageService.store(coverPhoto);
                collection.setCoverPhoto(filename);
            }

            // Save collection to database
            Collection savedCollection = collectionRepository.save(collection);

            // Return response with item count (0 for new collection)
            return new CollectionResponse(savedCollection, 0);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create collection: " + e.getMessage(), e);
        }
    }

    @Transactional(readOnly = true)
    public List<CollectionResponse> findAll() {
        List<Collection> collections = collectionRepository.findAll();
        
        return collections.stream()
                .map(collection -> {
                    int itemCount = (int) itemRepository.countByCollectionId(collection.getId());
                    return new CollectionResponse(collection, itemCount);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CollectionResponse findById(String id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found with id: " + id));
        
        int itemCount = (int) itemRepository.countByCollectionId(collection.getId());
        return new CollectionResponse(collection, itemCount);
    }

    @Transactional
    public CollectionResponse updateCollection(String id, String requestData, MultipartFile coverPhoto) {
        try {
            // Parse JSON request data
            UpdateCollectionRequest request = objectMapper.readValue(requestData, UpdateCollectionRequest.class);

            // Validate request
            collectionValidator.validateUpdateRequest(request, coverPhoto);

            // Find existing collection
            Collection collection = collectionRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Collection not found with id: " + id));

            // Store old cover photo filename for deletion if being replaced
            String oldCoverPhoto = collection.getCoverPhoto();

            // Update collection fields
            collection.setName(request.getName());
            collection.setAspectRatio(request.getAspectRatio());
            collection.setMetadata(request.getMetadata());

            // Handle cover photo replacement if new photo provided
            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                String filename = storageService.store(coverPhoto);
                collection.setCoverPhoto(filename);

                // Delete old cover photo if it exists
                if (oldCoverPhoto != null && !oldCoverPhoto.isEmpty()) {
                    try {
                        storageService.delete(oldCoverPhoto);
                    } catch (Exception e) {
                        // Log but don't fail the update if old file deletion fails
                        System.err.println("Failed to delete old cover photo: " + oldCoverPhoto);
                    }
                }
            }

            // Save updated collection
            Collection updatedCollection = collectionRepository.save(collection);

            // Return response with current item count
            int itemCount = (int) itemRepository.countByCollectionId(updatedCollection.getId());
            return new CollectionResponse(updatedCollection, itemCount);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update collection: " + e.getMessage(), e);
        }
    }
}
