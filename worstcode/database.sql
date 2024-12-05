CREATE DATABASE worst_clicker;

USE worst_clicker;

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    compteur INT DEFAULT 0
);²