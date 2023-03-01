<?php
// chargement des ressources


// contrôle d'accès


// chargement des données

if ($lesLignes === -1) {
    Std::traiterErreur("Échec lors de la lecture des données : " . Agenda::getError());
}

// chargement de l'interface



// Chargement des composants spécifiques


// transfert des données côté client
