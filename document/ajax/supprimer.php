<?php


require '../../include/initialisation.php';

if (!isset($_POST['titre']) || !isset($_POST['ext']) || !isset($_POST['type'])) {
    echo "Paramètre manquant";
    exit;
}

// récupération des paramètres
$titre = $_POST['titre'];
$ext =  $_POST['ext'];
$type =  $_POST['type'];

// modification de la valeur du bandeau
$db = Database::getInstance();

$sql = <<<EOD
        Delete from documents(titre,type,fichier) values (:titre, :type, :fichier);
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('titre', $titre);
$curseur->bindParam('type', $type);
$str = $titre . '.' . $ext;
$curseur->bindParam('fichier', $str);
try {
    $curseur->execute();
    echo 1;

} catch (Exception $e) {
    echo substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
}


