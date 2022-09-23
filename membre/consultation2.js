"use strict";

window.onload = init;

/**
 * Initialisation du composant table sorter
 * Récupération des membres pour un affichage en mode tableau
 */
function init() {
    $('[data-toggle="tooltip"]').tooltip();
    $("#leTableau").tablesorter({
        headers: {
            5: {sorter: false}
        }
    });