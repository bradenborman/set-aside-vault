package com.vault.controller;

import com.vault.dto.ItemResponse;
import com.vault.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(
            @RequestParam("data") String requestData,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ItemResponse response = itemService.createItem(requestData, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
