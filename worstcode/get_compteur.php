<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Connexion à la base de données
$conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_données');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Vérifier l'existence de la session
if (!isset($_SESSION['session_id'])) {
    die("Session non trouvée !");
}

$session_id = $_SESSION['session_id'];

// Récupérer le compteur actuel
$sql_get_compteur = "SELECT compteur FROM sessions WHERE session_id = '$session_id'";
$result_compteur = $conn->query($sql_get_compteur);

if ($result_compteur->num_rows > 0) {
    $row_compteur = $result_compteur->fetch_assoc();
    $compteur = $row_compteur['compteur'];
} else {
    $compteur = 0;  // Si la session n'est pas trouvée, compteur à 0
}

// Récupérer l'historique des 5 derniers clics
$sql_historique = "SELECT * FROM sessionhistoire ORDER BY update_time DESC LIMIT 5";
$result_historique = $conn->query($sql_historique);
$historique = [];

while ($row = $result_historique->fetch_assoc()) {
    $historique[] = $row;
}

// Renvoi des données sous forme de JSON
echo json_encode([
    'compteur' => $compteur,
    'historique' => $historique
]);

$conn->close();
?>
