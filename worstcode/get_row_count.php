<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connexion à la base de données
$conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_données');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Requête pour récupérer le nombre de lignes dans la table `sessionhistoire`
$sql = "SELECT COUNT(*) AS total_rows FROM sessionhistoire";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    $total_rows = $row['total_rows'];
    // Renvoi du nombre de lignes en JSON
    echo json_encode(['total_rows' => $total_rows]);
} else {
    echo json_encode(['error' => 'Erreur lors de la récupération des données']);
}

$conn->close();
?>
