<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connexion à la base de données
$conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_donnees');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupérer les paramètres de la requête (rang de la ligne et nom de la colonne)
$rang = isset($_GET['rang']) ? (int)$_GET['rang'] : 0;
$colonne = isset($_GET['colonne']) ? $_GET['colonne'] : '';

if (empty($colonne) || $rang < 0) {
    echo json_encode(['error' => 'Paramètres invalides']);
    exit;
}

// Requête pour récupérer la valeur d'une colonne spécifique de la ligne spécifiée
$sql = "SELECT $colonne FROM sessionhistoire LIMIT $rang, 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Récupérer la valeur de la colonne
    $row = $result->fetch_assoc();
    echo json_encode(['value' => $row[$colonne]]);
} else {
    echo json_encode(['error' => 'Donnée introuvable']);
}

$conn->close();
?>
