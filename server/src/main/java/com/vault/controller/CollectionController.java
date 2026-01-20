package com.vault.controller;

import com.vault.dto.CollectionResponse;
import com.vault.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "*")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @PostMapping
    public ResponseEntity<CollectionResponse> createCollection(
            @RequestParam("data") String requestData,
            @RequestParam(value = "coverPhoto", required = false) MultipartFile coverPhoto) {
        CollectionResponse response = collectionService.createCollection(requestData, coverPhoto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
