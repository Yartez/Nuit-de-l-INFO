CREATE DATABASE nom_de_la_base_de_données;

USE nom_de_la_base_de_données;

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    compteur INT DEFAULT 0,
    ip_address VARCHAR(45) DEFAULT '0.0.0.0',
    user_agent TEXT DEFAULT 'Unknown',
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_access_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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