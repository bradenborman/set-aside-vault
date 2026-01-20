package com.vault.dto;

import com.vault.entity.AspectRatio;
import com.vault.entity.Collection;

import java.time.LocalDateTime;
import java.util.Map;

public class CollectionResponse {

    private String id;
    private String name;
    private LocalDateTime createdAt;
    private String coverPhoto;
    private AspectRatio aspectRatio;
    private Map<String, String> metadata;
    private java.util.List<String> itemCategories;
    private int itemCount;

    public CollectionResponse() {
    }

    public CollectionResponse(Collection collection, int itemCount) {
        this.id = collection.getId();
        this.name = collection.getName();
        this.createdAt = collection.getCreatedAt();
        this.coverPhoto = collection.getCoverPhoto();
        this.aspectRatio = collection.getAspectRatio();
        this.metadata = collection.getMetadata();
        this.itemCategories = collection.getItemCategories();
        this.itemCount = itemCount;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public AspectRatio getAspectRatio() {
        return aspectRatio;
    }

    public void setAspectRatio(AspectRatio aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public Map<String, String> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, String> metadata) {
        this.metadata = metadata;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public java.util.List<String> getItemCategories() {
        return itemCategories;
    }

    public void setItemCategories(java.util.List<String> itemCategories) {
        this.itemCategories = itemCategories;
    }
}
