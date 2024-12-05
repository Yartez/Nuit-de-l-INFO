<?php

if (session_status() !== PHP_SESSION_ACTIVE) {
	session_name('UserRFWSession');
	session_start();
}

date_default_timezone_set('Europe/Paris');

// Connexion à la db
// require_once("assets/php/instances/pdo.php");

// Derniere page
// require_once("assets/php/instances/last_page.php");

// Fonctions
// require_once("assets/php/instances/functions.php");

// Bannis
// require_once("assets/php/instances/bans.php");

// Maintenance
// require_once("assets/php/instances/maintenance.php");

// Vérification connexion
// require_once("assets/php/instances/redirect_log.php");

// Détection de l'autoconnection
// include_once('assets/php/cookie/cookieconnect.php');

// Chargement des dépendences
// require_once("assets/library/vendor/autoload.php");

$siteVersion = "1.0.0";

?>