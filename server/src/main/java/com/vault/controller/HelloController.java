package com.vault.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Set-Aside-Vault!";
    }
    
    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }
}
