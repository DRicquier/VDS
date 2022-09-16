<?php

/*
 * Récupération des données alimentant la page d'accueil
 */

require '../../include/initialisation.php';
require '../../class/class.database.php';

$type = $_GET['type'];

//Creation du tableau contenant les données
$db = Database::getInstance();
$sql = <<<EOD
    Select titre, type, fichier
    From documents
    where type = :type
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam(":type", $type);
$curseur->execute();
$lesDonnees = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();

echo json_encode($lesDonnees);