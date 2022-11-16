<?php
require '../../include/initialisation.php';

const REP = "../../data/document/";


// contrôle de l'existence des paramètres attendus
if (!isset($_FILES['fichier'])) {
    echo "Il faut transmettre un fichier";
    exit;
}


// détection d'une erreur lors de la transmission
if ($_FILES['fichier']['error'] !== 0) {
    echo "Aucun fichier reçu";
    exit;
}

// récupération des données transmises
$tmp = $_FILES['fichier']['tmp_name'];
$nomFichier = $_FILES['fichier']['name'];
$taille = $_FILES['fichier']['size'];
$typeDeFichier = 'Club';

//contrôle afin de savoir si le fichier n'existe pas déjà
require '../../class/class.database.php';
$db = Database::getInstance();


$fichier = REP . $nomFichier;
if (unlink($fichier)) {
    $db = Database::getInstance();

    $sql = <<<EOD
        Delete from documents where fichier = :fichier;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam(':fichier', $nomFichier);
    $curseur->execute();
    $ligne = $curseur->fetch(PDO::FETCH_ASSOC);


}
// Vérification du fichier

// vérification de la taille
$tailleMax = 1 * 1024 * 1024;
if ($taille > $tailleMax) {
    echo "La taille du fichier ($taille) dépasse la taille autorisée ($tailleMax)";
    exit;
}

// vérification de l'extension
$lesExtensions = ["pdf"];
$extension = pathinfo($nomFichier, PATHINFO_EXTENSION);
if (!in_array($extension, $lesExtensions)) {
    echo "Extension du fichier non acceptée : $extension";
    exit;
}

// contrôle du type mime du fichier
$lesTypes = ["application/force-download", "application/pdf"];
$type = mime_content_type($tmp);
if (!in_array($type, $lesTypes)) {
    echo "Type de fichier non accepté : $type";
    exit;
}

// récupération du nom du fichier sans son extension
$nom = pathinfo($nomFichier, PATHINFO_FILENAME);

// suppression des accents et autres caractères non alphanumériques et mise en minuscule
$nom = strtolower(trim(($nom)));

// Ajout éventuel d'un suffixe sur le nom en cas de doublon
$nomFichier = "$nom.$extension";
$i = 1;
while (file_exists(REP . $nomFichier)) {
    $nomFichier = "$nom($i).$extension";
    $i++;
}

// copie sur le serveur
if (copy($tmp, REP . $nomFichier)) {
    $db = Database::getInstance();

    $sql = <<<EOD
        Insert into documents(titre,type,fichier) values (:titre, :type, :fichier);
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('titre', $str);
    $curseur->bindParam('type', $typeDeFichier);
    $curseur->bindParam('fichier', $nomFichier);
    try {
        $curseur->execute();
        echo 1;

    } catch (Exception $e) {
        echo substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
    }

    echo 1;
} else {
    echo "La copie du fichier sur le serveur a échoué";
}








