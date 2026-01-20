package com.vault.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    /**
     * Forward all non-API routes to index.html to support React Router client-side routing.
     * This allows direct URL access and page refreshes to work correctly with React Router.
     */
    @GetMapping(value = {
            "/",
            "/collection/{id}",
            "/collection/{id}/*",
            "/stories",
            "/stories/*",
            "/admin",
            "/admin/*",
            "/upload",
            "/upload/*"
    })
    public String forward() {
        return "index";
    }
}
