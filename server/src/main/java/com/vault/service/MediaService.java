package com.vault.service;

import com.vault.repository.CollectionRepository;
import com.vault.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.Instant;
import java.util.*;
import java.util.stream.Stream;

@Service
public class MediaService {

    @Autowired
    private StorageService storageService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Value("${storage.location}")
    private String storageLocation;

    public List<String> bulkUpload(MultipartFile[] files) {
        List<String> uploadedFilenames = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                if (file.isEmpty()) {
                    errors.add("Skipped empty file: " + file.getOriginalFilename());
                    continue;
                }

                // Validate file is an image
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    errors.add("Skipped non-image file: " + file.getOriginalFilename());
                    continue;
                }

                // Store the file
                String filename = storageService.store(file);
                uploadedFilenames.add(filename);
            } catch (Exception e) {
                errors.add("Failed to upload " + file.getOriginalFilename() + ": " + e.getMessage());
            }
        }

        // If there were errors but some files succeeded, we still return success with warnings
        if (!errors.isEmpty() && uploadedFilenames.isEmpty()) {
            throw new RuntimeException("All uploads failed: " + String.join(", ", errors));
        }

        return uploadedFilenames;
    }

    public List<Map<String, Object>> getUnusedMedia() {
        try {
            // Get all filenames referenced in database
            Set<String> usedFilenames = getUsedFilenames();

            // Get all files in storage
            Path rootPath = Paths.get(storageLocation);
            List<Map<String, Object>> unusedFiles = new ArrayList<>();

            try (Stream<Path> paths = Files.walk(rootPath, 1)) {
                paths.filter(Files::isRegularFile)
                     .filter(path -> !usedFilenames.contains(path.getFileName().toString()))
                     .forEach(path -> {
                         try {
                             BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
                             Map<String, Object> fileInfo = new HashMap<>();
                             fileInfo.put("filename", path.getFileName().toString());
                             fileInfo.put("size", attrs.size());
                             fileInfo.put("createdAt", Instant.ofEpochMilli(attrs.creationTime().toMillis()));
                             fileInfo.put("url", "/api/images/" + path.getFileName().toString());
                             unusedFiles.add(fileInfo);
                         } catch (IOException e) {
                             // Skip files we can't read
                         }
                     });
            }

            return unusedFiles;
        } catch (IOException e) {
            throw new RuntimeException("Failed to list unused media: " + e.getMessage(), e);
        }
    }

    private Set<String> getUsedFilenames() {
        Set<String> usedFilenames = new HashSet<>();

        // Get all item filenames
        itemRepository.findAll().forEach(item -> {
            if (item.getFilename() != null && !item.getFilename().isEmpty()) {
                usedFilenames.add(item.getFilename());
            }
        });

        // Get all collection cover photos
        collectionRepository.findAll().forEach(collection -> {
            if (collection.getCoverPhoto() != null && !collection.getCoverPhoto().isEmpty()) {
                usedFilenames.add(collection.getCoverPhoto());
            }
        });

        return usedFilenames;
    }
}
