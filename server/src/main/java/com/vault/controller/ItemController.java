package com.vault.controller;

import com.vault.dto.ItemResponse;
import com.vault.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.findAll();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable String id) {
        ItemResponse item = itemService.findById(id);
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(
            @RequestParam("data") String requestData,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ItemResponse response = itemService.createItem(requestData, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> updateItem(
            @PathVariable String id,
            @RequestParam("data") String requestData,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ItemResponse response = itemService.updateItem(id, requestData, image);
        return ResponseEntity.ok(response);
    }
}
