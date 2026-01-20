package com.vault.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vault.dto.CreateItemRequest;
import com.vault.dto.ItemResponse;
import com.vault.entity.Item;
import com.vault.repository.CollectionRepository;
import com.vault.repository.ItemRepository;
import com.vault.validation.ItemValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
}
