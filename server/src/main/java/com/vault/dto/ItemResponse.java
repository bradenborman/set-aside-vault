package com.vault.dto;

import com.vault.entity.Item;

import java.time.LocalDateTime;
import java.util.Map;

public class ItemResponse {

    private String id;
    private String collectionId;
    private String url;
    private String title;
    private String filename;
    private LocalDateTime uploadedAt;
    private Map<String, String> metadata;

    public ItemResponse() {
    }

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.collectionId = item.getCollectionId();
        this.url = item.getUrl();
        this.title = item.getTitle();
        this.filename = item.getFilename();
        this.uploadedAt = item.getUploadedAt();
        this.metadata = item.getMetadata();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(String collectionId) {
        this.collectionId = collectionId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Map<String, String> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, String> metadata) {
        this.metadata = metadata;
    }
}
