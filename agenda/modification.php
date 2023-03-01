<?php

// Affichage de l'interface de modification
// donnée transmise par la méthode GET : id

// chargement des ressources


// contrôle d'accès


// récupération de l'enregistrement correspondant


if (!$ligne) {
    Std::traiterErreur($table->getValidationMessage());
}

// chargement de la page
// intervalle accepté pour la date de l'événement : dans l'annèe à venir


$titreFonction = "Modification d'un événement de l'agenda";
require RACINE . '/include/interface.php';

// chargement des composants spécifiques


// transfert des données côté client
$data = json_encode($ligne);
echo "<script>let data = $data </script>";
