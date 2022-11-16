<?php

require '../../include/initialisation.php';

const REP = "../../data/document/";

// vérification de la transmission des paramètres
if (!isset($_POST['id'])) {
    echo "Le paramètre n'est pas transmis";
    exit;
}

// récupération de la valeur
$id = $_POST['id'];

// vérification de la valeur
if (strlen($id) === 0) {
    echo "Le paramètre n'est pas renseigné";
    exit;
}
$db = Database::getInstance();

$sql = <<<EOD
        Select fichier from documents where id = :id

EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('id', $id);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();
if ($ligne) {
    $fichier = REP . $ligne['fichier'];
    unlink($fichier);

    $sql = <<<EOD
        Delete from documents where id = :id;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('id', $id);
    try {
        $curseur->execute();
        echo 1;

    } catch (Exception $e) {
        echo substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
    }

} else
    echo "Ce document n'existe pas";




