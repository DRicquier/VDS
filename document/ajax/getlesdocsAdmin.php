<?php

/*
 * Récupération des données alimentant la page d'accueil
 */

require '../../include/initialisation.php';
require '../../class/class.database.php';


//Creation du tableau contenant les données
$db = Database::getInstance();
$sql = <<<EOD
    Select id,titre, fichier
    From documents
EOD;
$curseur = $db->prepare($sql);
$curseur->execute();
$lesDonnees = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();

echo json_encode($lesDonnees);