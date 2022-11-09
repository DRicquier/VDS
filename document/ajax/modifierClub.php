<?php


// vérification de la transmission des paramètres
$erreur = false;

// vérification de la transmission du paramètre id
if (!isset($_POST['id'])) {
    echo "L'identifiant du document doit être transmis";
    $erreur = true;
}

if ($erreur) exit;

// récupération des données
$type = $_POST["type"];
$id = $_POST["id"];


// lancement de la mise à jour
require '../../class/class.database.php';
$db = Database::getInstance();
$sql = <<<EOD
    update documents
        set type = :type
    where id = :id;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('type', $type);
$curseur->bindParam('id', $id);
try {
    $curseur->execute();
    echo 1;
} catch (Exception $e) {
    echo substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
}