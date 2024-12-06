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

// Vérifier si la demande AJAX contient des paramètres nécessaires
if (isset($_GET['table']) && isset($_GET['column']) && isset($_GET['row'])) {
    $table = $_GET['table'];
    $column = $_GET['column'];
    $row = $_GET['row'];

    // Requête pour récupérer une seule valeur de la table
    $sql = "SELECT $column FROM $table LIMIT $row, 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data_row = $result->fetch_assoc();
        $response = [
            'column' => $column,
            'value' => $data_row[$column],
            'row' => $row,
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'Données non trouvées']);
    }
    exit;
}

$conn->close();
?>
