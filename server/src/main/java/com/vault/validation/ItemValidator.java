package com.vault.validation;

import com.vault.dto.CreateItemRequest;
import com.vault.dto.UpdateItemRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ItemValidator {

    public void validateCreateRequest(CreateItemRequest request, MultipartFile image) {
        // Validate collection ID
        if (request.getCollectionId() == null || request.getCollectionId().trim().isEmpty()) {
            throw new IllegalArgumentException("Collection ID is required");
        }

        // Validate title
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Item title is required");
        }

        // Validate image
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Item image is required");
        }

        // Validate file type
        String contentType = image.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Item image must be an image file");
        }

        // Validate file size (max 10MB)
        long maxSize = 10 * 1024 * 1024; // 10MB
        if (image.getSize() > maxSize) {
            throw new IllegalArgumentException("Item image must be less than 10MB");
        }
    }

    public void validateUpdateRequest(UpdateItemRequest request, MultipartFile image) {
        // Validate collection ID
        if (request.getCollectionId() == null || request.getCollectionId().trim().isEmpty()) {
            throw new IllegalArgumentException("Collection ID is required");
        }

        // Validate title
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Item title is required");
        }

        // Validate image if provided (optional for update)
        if (image != null && !image.isEmpty()) {
            // Validate file type
            String contentType = image.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("Item image must be an image file");
            }

            // Validate file size (max 10MB)
            long maxSize = 10 * 1024 * 1024; // 10MB
            if (image.getSize() > maxSize) {
                throw new IllegalArgumentException("Item image must be less than 10MB");
            }
        }
    }
}
