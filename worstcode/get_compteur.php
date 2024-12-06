<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Connexion à la base de données
$conn = new mysqli('localhost', 'root', '', 'worst_clicker');

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Générer un ID de session s'il n'existe pas
if (!isset($_SESSION['session_id'])) {
    $_SESSION['session_id'] = bin2hex(random_bytes(16));
}

$session_id = $_SESSION['session_id'];
$ip_address = $_SERVER['REMOTE_ADDR'];  // Adresse IP de l'utilisateur
$user_agent = $_SERVER['HTTP_USER_AGENT'];  // User-agent de l'utilisateur

// Vérifier si la session existe dans la base
$sql = "SELECT compteur FROM sessions WHERE session_id = '$session_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $compteur = $row['compteur'];

    // Mettre à jour l'IP et le user-agent à chaque accès
    $update_sql = "UPDATE sessions 
                   SET ip_address = '$ip_address', user_agent = '$user_agent', last_access_time = CURRENT_TIMESTAMP 
                   WHERE session_id = '$session_id'";
    $conn->query($update_sql);
} else {
    // Si la session n'existe pas, l'ajouter avec compteur à 0
    $compteur = 0;
    $insert_sql = "INSERT INTO sessions (session_id, compteur, ip_address, user_agent) 
                   VALUES ('$session_id', $compteur, '$ip_address', '$user_agent')";
    $conn->query($insert_sql);
}

// Récupérer l'historique des 5 derniers clics
$sql_historique = "SELECT ancien_compteur, nouveau_compteur, update_time 
                   FROM sessionhistoire 
                   WHERE session_id = '$session_id' 
                   ORDER BY update_time DESC 
                   LIMIT 5";
$historique_result = $conn->query($sql_historique);

$historique = [];
if ($historique_result->num_rows > 0) {
    while ($row = $historique_result->fetch_assoc()) {
        $historique[] = $row;
    }
}

$conn->close();

// Retourner le compteur et l'historique en JSON
echo json_encode(['compteur' => $compteur, 'historique' => $historique]);
?>
