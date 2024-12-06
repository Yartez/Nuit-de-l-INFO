CREATE DATABASE nom_de_la_base_de_données;

USE nom_de_la_base_de_données;

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    compteur INT DEFAULT 0
);