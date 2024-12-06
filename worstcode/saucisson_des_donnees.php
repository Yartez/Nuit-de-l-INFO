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

// Récupérer toutes les tables de la base de données
$sql_tables = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'nom_de_la_base_de_données'";
$result_tables = $conn->query($sql_tables);

if ($result_tables->num_rows > 0) {
    echo "<h1>Exploration des données - Champ par champ</h1>";

    // Parcourir chaque table
    while ($table_row = $result_tables->fetch_assoc()) {
        $table_name = $table_row['TABLE_NAME'];
        echo "<h2>Table : $table_name</h2>";

        // Récupérer toutes les colonnes de la table actuelle
        $sql_columns = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                        WHERE TABLE_SCHEMA = 'nom_de_la_base_de_données' AND TABLE_NAME = '$table_name'";
        $result_columns = $conn->query($sql_columns);

        if ($result_columns->num_rows > 0) {
            // Préparer la requête pour récupérer les données
            $columns = [];
            while ($col_row = $result_columns->fetch_assoc()) {
                $columns[] = $col_row['COLUMN_NAME'];
            }

            // Récupérer toutes les données de la table
            $sql_data = "SELECT * FROM $table_name";
            $result_data = $conn->query($sql_data);

            if ($result_data->num_rows > 0) {
                // Parcourir chaque ligne
                while ($data_row = $result_data->fetch_assoc()) {
                    echo "<div style='border:1px solid #ccc; padding:10px; margin:10px;'>";

                    // Parcourir chaque colonne, afficher chaque champ séparément
                    foreach ($columns as $col_name) {
                        echo "<p><strong>$col_name</strong>: " . htmlspecialchars($data_row[$col_name]) . "</p>";
                        // Simuler un léger délai pour l'effet dramatique
                        usleep(500000); // 500ms de délai
                    }

                    echo "</div>";
                }
            } else {
                echo "<p>Aucune donnée trouvée dans la table $table_name.</p>";
            }
        } else {
            echo "<p>Aucune colonne trouvée dans la table $table_name.</p>";
        }
    }
} else {
    echo "<p>Aucune table trouvée dans la base de données.</p>";
}

$conn->close();
?>
