<?php
// Exemple de get_row_count.php
header('Content-Type: application/json');

try {
    // Connexion à la base de données (ajuste les paramètres selon ta configuration)
    $conn = new mysqli('localhost', 'nouvel_utilisateur', 'mot_de_passe', 'nom_de_la_base_de_données');

    // Vérifie si la connexion a réussi
    if ($conn->connect_error) {
        throw new Exception("Connexion échouée : " . $conn->connect_error);
    }

    // Requête pour obtenir le nombre de lignes dans la table sessionhistoire
    $sql = "SELECT COUNT(*) AS total_rows FROM sessionhistoire";
    $result = $conn->query($sql);

    // Vérifie si la requête a réussi
    if ($result) {
        $row = $result->fetch_assoc();
        echo json_encode(['total_rows' => $row['total_rows']]);
    } else {
        throw new Exception("Erreur lors de la récupération des données.");
    }

    $conn->close();
} catch (Exception $e) {
    // Envoie un message d'erreur en cas d'exception
    echo json_encode(['error' => $e->getMessage()]);
}
?>
