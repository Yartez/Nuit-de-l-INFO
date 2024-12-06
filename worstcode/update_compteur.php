<?php
session_start();

// Connexion à la base de données
$conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_données');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupérer l'ID de session
if (!isset($_SESSION['session_id'])) {
    die("Session non trouvée !");
}
$session_id = $_SESSION['session_id'];

// Incrémenter le compteur dans la base de données
$sql = "UPDATE sessions SET compteur = compteur + 1 WHERE session_id = '$session_id'";
if ($conn->query($sql) === TRUE) {
    echo "Compteur incrémenté";
} else {
    echo "Erreur : " . $conn->error;
}

$conn->close();
?>
