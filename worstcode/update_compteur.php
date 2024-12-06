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

// Récupérer l'ID de session
if (!isset($_SESSION['session_id'])) {
    die("Session non trouvée !");
}

$session_id = $_SESSION['session_id'];
$ip_address = $_SERVER['X-Forwarded-For'];  // Adresse IP de l'utilisateur
$user_agent = $_SERVER['HTTP_USER_AGENT'];  // User-agent de l'utilisateur

// Récupérer l'ancien compteur avant mise à jour
$sql_get = "SELECT compteur FROM sessions WHERE session_id = '$session_id'";
$result = $conn->query($sql_get);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ancien_compteur = $row['compteur'];
} else {
    die("Session introuvable !");
}

// Incrémenter le compteur et mettre à jour les champs
$ip = $_SERVER['X-Forwarded-For'];
$sql_update = "UPDATE sessions 
        SET compteur = compteur + 1, 
            ip_address = '$ip', 
            user_agent = '$user_agent', 
            update_time = CURRENT_TIMESTAMP 
        WHERE session_id = '$session_id'";

if ($conn->query($sql_update) === TRUE) {
    $nouveau_compteur = $ancien_compteur + 1;

    // Insérer dans l'historique
    $ip = $_SERVER['X-Forwarded-For'];
    $sql_historique = "INSERT INTO sessionhistoire (session_id, ip_address, user_agent, ancien_compteur, nouveau_compteur, update_time)
                       VALUES ('$session_id', '$ip', '$user_agent', $ancien_compteur, $nouveau_compteur, CURRENT_TIMESTAMP)";
    
    if ($conn->query($sql_historique) === TRUE) {
        echo "Compteur mis à jour et historique enregistré.";
    } else {
        echo "Erreur lors de l'enregistrement de l'historique : " . $conn->error;
    }
} else {
    echo "Erreur lors de la mise à jour du compteur : " . $conn->error;
}

$conn->close();
?>