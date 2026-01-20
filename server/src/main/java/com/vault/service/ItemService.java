package com.vault.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vault.dto.CreateItemRequest;
import com.vault.dto.ItemResponse;
import com.vault.dto.UpdateItemRequest;
import com.vault.entity.Item;
import com.vault.repository.CollectionRepository;
import com.vault.repository.ItemRepository;
import com.vault.validation.ItemValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private ItemValidator itemValidator;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public ItemResponse createItem(String requestData, MultipartFile image) {
        try {
            // Parse JSON request data
            CreateItemRequest request = objectMapper.readValue(requestData, CreateItemRequest.class);

            // Validate request
            itemValidator.validateCreateRequest(request, image);

            // Verify collection exists
            collectionRepository.findById(request.getCollectionId())
                    .orElseThrow(() -> new IllegalArgumentException("Collection not found with id: " + request.getCollectionId()));

            // Create new item entity
            Item item = new Item();
            item.setCollectionId(request.getCollectionId());
            item.setTitle(request.getTitle());
            item.setMetadata(request.getMetadata());

            // Handle image upload
            if (image != null && !image.isEmpty()) {
                String filename = storageService.store(image);
                item.setFilename(filename);
                // Set URL to the API endpoint for serving images
                item.setUrl("/api/images/" + filename);
            }

            // Save item to database
            Item savedItem = itemRepository.save(item);

            // Return response
            return new ItemResponse(savedItem);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create item: " + e.getMessage(), e);
        }
    }

    public List<ItemResponse> findByCollectionId(String collectionId) {
        // Verify collection exists
        collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found with id: " + collectionId));

        List<Item> items = itemRepository.findByCollectionId(collectionId);
        return items.stream()
                .map(ItemResponse::new)
                .collect(Collectors.toList());
    }

    public List<ItemResponse> findAll() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(ItemResponse::new)
                .collect(Collectors.toList());
    }

    public ItemResponse findById(String id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + id));
        return new ItemResponse(item);
    }

    @Transactional
    public ItemResponse updateItem(String id, String requestData, MultipartFile image) {
        try {
            // Parse JSON request data
            UpdateItemRequest request = objectMapper.readValue(requestData, UpdateItemRequest.class);

            // Validate request
            itemValidator.validateUpdateRequest(request, image);

            // Find existing item
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + id));

            // Verify collection exists
            collectionRepository.findById(request.getCollectionId())
                    .orElseThrow(() -> new IllegalArgumentException("Collection not found with id: " + request.getCollectionId()));

            // Store old image filename for deletion if being replaced
            String oldFilename = item.getFilename();

            // Update item fields
            item.setCollectionId(request.getCollectionId());
            item.setTitle(request.getTitle());
            item.setMetadata(request.getMetadata());

            // Handle image replacement if new image provided
            if (image != null && !image.isEmpty()) {
                String filename = storageService.store(image);
                item.setFilename(filename);
                item.setUrl("/api/images/" + filename);

                // Delete old image if it exists
                if (oldFilename != null && !oldFilename.isEmpty()) {
                    try {
                        storageService.delete(oldFilename);
                    } catch (Exception e) {
                        // Log but don't fail the update if old file deletion fails
                        System.err.println("Failed to delete old item image: " + oldFilename);
                    }
                }
            }

            // Save updated item
            Item updatedItem = itemRepository.save(item);

            // Return response
            return new ItemResponse(updatedItem);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update item: " + e.getMessage(), e);
        }
    }
}
