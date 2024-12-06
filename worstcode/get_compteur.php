<?php
session_start();

// Connexion à la base de données
$conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_données');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Générer un ID de session s'il n'existe pas
if (!isset($_SESSION['session_id'])) {
    $_SESSION['session_id'] = bin2hex(random_bytes(16));
}

// Vérifier si la session existe dans la base
$session_id = $_SESSION['session_id'];
$sql = "SELECT compteur FROM sessions WHERE session_id = '$session_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $compteur = $row['compteur'];
} else {
    // Si la session n'existe pas, l'ajouter avec compteur à 0
    $compteur = 0;
    $sql = "INSERT INTO sessions (session_id, compteur) VALUES ('$session_id', $compteur)";
    $conn->query($sql);
}

$conn->close();

// Retourner le compteur en JSON
echo json_encode(['compteur' => $compteur]);
?>