package com.vault.controller;

import com.vault.dto.CollectionResponse;
import com.vault.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "*")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @GetMapping
    public ResponseEntity<List<CollectionResponse>> getAllCollections() {
        List<CollectionResponse> collections = collectionService.findAll();
        return ResponseEntity.ok(collections);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionResponse> getCollectionById(@PathVariable String id) {
        CollectionResponse collection = collectionService.findById(id);
        return ResponseEntity.ok(collection);
    }

    @PostMapping
    public ResponseEntity<CollectionResponse> createCollection(
            @RequestParam("data") String requestData,
            @RequestParam(value = "coverPhoto", required = false) MultipartFile coverPhoto) {
        CollectionResponse response = collectionService.createCollection(requestData, coverPhoto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
