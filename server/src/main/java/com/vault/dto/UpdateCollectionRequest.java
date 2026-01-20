package com.vault.dto;

import com.vault.entity.AspectRatio;

import java.util.Map;

public class UpdateCollectionRequest {

    private String name;

    private AspectRatio aspectRatio;

    private Map<String, String> metadata;

    private java.util.List<String> itemCategories;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public java.util.List<String> getItemCategories() {
        return itemCategories;
    }

    public void setItemCategories(java.util.List<String> itemCategories) {
        this.itemCategories = itemCategories;
    }
}
