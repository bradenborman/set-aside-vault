package com.vault.validation;

import com.vault.dto.CreateCollectionRequest;
import com.vault.dto.UpdateCollectionRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class CollectionValidator {

    public void validateCreateRequest(CreateCollectionRequest request, MultipartFile coverPhoto) {
        // Validate name
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Collection name is required");
        }

        // Validate aspect ratio
        if (request.getAspectRatio() == null) {
            throw new IllegalArgumentException("Aspect ratio is required");
        }

        // Validate cover photo
        if (coverPhoto == null || coverPhoto.isEmpty()) {
            throw new IllegalArgumentException("Cover photo is required");
        }

        // Validate file type
        String contentType = coverPhoto.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Cover photo must be an image file");
        }

        // Validate file size (max 10MB)
        long maxSize = 10 * 1024 * 1024; // 10MB
        if (coverPhoto.getSize() > maxSize) {
            throw new IllegalArgumentException("Cover photo must be less than 10MB");
        }
    }

    public void validateUpdateRequest(UpdateCollectionRequest request, MultipartFile coverPhoto) {
        // Validate name
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Collection name is required");
        }

        // Validate aspect ratio
        if (request.getAspectRatio() == null) {
            throw new IllegalArgumentException("Aspect ratio is required");
        }

        // Validate cover photo if provided (optional for update)
        if (coverPhoto != null && !coverPhoto.isEmpty()) {
            // Validate file type
            String contentType = coverPhoto.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("Cover photo must be an image file");
            }

            // Validate file size (max 10MB)
            long maxSize = 10 * 1024 * 1024; // 10MB
            if (coverPhoto.getSize() > maxSize) {
                throw new IllegalArgumentException("Cover photo must be less than 10MB");
            }
        }
    }
}
