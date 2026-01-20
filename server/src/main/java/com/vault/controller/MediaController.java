package com.vault.controller;

import com.vault.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/bulk")
    public ResponseEntity<Map<String, Object>> bulkUpload(
            @RequestParam("files") MultipartFile[] files
    ) {
        try {
            List<String> uploadedFilenames = mediaService.bulkUpload(files);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Files uploaded successfully",
                "filenames", uploadedFilenames,
                "count", uploadedFilenames.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/unused")
    public ResponseEntity<List<Map<String, Object>>> getUnusedMedia() {
        try {
            List<Map<String, Object>> unusedFiles = mediaService.getUnusedMedia();
            return ResponseEntity.ok(unusedFiles);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of(
                "error", e.getMessage()
            )));
        }
    }
}
