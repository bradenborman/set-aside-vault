-- Set-Aside-Vault Database Schema
-- Auto-executed on startup by Spring Boot

-- Table: collections
CREATE TABLE IF NOT EXISTS collections (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    cover_photo VARCHAR(255),
    aspect_ratio VARCHAR(20) NOT NULL,
    metadata JSON,
    INDEX idx_created_at (created_at),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: items
CREATE TABLE IF NOT EXISTS items (
    id VARCHAR(36) PRIMARY KEY,
    collection_id VARCHAR(36),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at DATETIME NOT NULL,
    metadata JSON,
    INDEX idx_collection_id (collection_id),
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_title (title),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: stories
CREATE TABLE IF NOT EXISTS stories (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    item_id VARCHAR(36),
    collection_id VARCHAR(36),
    cover_image VARCHAR(255),
    tags JSON,
    INDEX idx_created_at (created_at),
    INDEX idx_title (title),
    INDEX idx_item_id (item_id),
    INDEX idx_collection_id (collection_id),
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
