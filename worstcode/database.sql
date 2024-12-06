CREATE DATABASE nom_de_la_base_de_données;

USE nom_de_la_base_de_données;

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    compteur INT DEFAULT 0
);
CREATE TABLE sessionhistoire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    ancien_compteur INT NOT NULL,
    nouveau_compteur INT NOT NULL,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);