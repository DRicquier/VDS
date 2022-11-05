<?php


require '../../include/initialisation.php';

const REP = "../../data/document/";

// vérification de la transmission des paramètres
if (!isset($_POST['nomFichier'])) {
    echo "Le paramètre n'est pas transmis";
    exit;
}

// récupération de la valeur
$nomFichier = trim($_POST['nomFichier']);

// vérification de la valeur
if (strlen($nomFichier) === 0) {
    echo "Le paramètre n'est pas renseigné";
    exit;
}

$fichier = REP . $nomFichier . ".pdf";

// vérification de l'existence du fichier
if(!file_exists($fichier)) {
    echo "Ce fichier n'existe pas";
    exit;
}

// suppression du fichier
if (unlink($fichier)){
    {
        $db = Database::getInstance();

        $sql = <<<EOD
        Delete from documents where titre = :titre;
EOD;

        $curseur = $db->prepare($sql);
        $curseur->bindParam('titre', $nomFichier);
        try {
            $curseur->execute();
            echo 1;

        } catch (Exception $e) {
            echo substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
        }

        echo 1;
    }
}


else
    echo "La suppression a échoué";


