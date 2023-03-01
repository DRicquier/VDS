"use strict";

window.onload = () => {
    // drapeau permettant de savoir si on a au moins une ligne supprimable et ainsi d'afficher ou de masque le bouton epurer

    for (const element of data) {
        let id = element.id;
        let tr = lesLignes.insertRow();
        tr.id = id;
        tr.style.verticalAlign = 'middle';
        // on marque les lignes pour savoir si elles font parties des lignes à effacer ou pas

        // on change la couleur de fond des lignes qui font parties de l'épuration


        // colonne contenant des boutons de suppression et de modification
        let td = tr.insertCell();
        let i = document.createElement('i');
        i.classList.add("bi", "bi-x", "text-danger", 'fs-2');
        i.style.cursor = "pointer";
        i.onclick = () => Std.confirmer(() => supprimer(id));
        td.appendChild(i);

        // icône de modification dans la même cellule
        i = document.createElement('i');
        i.classList.add('bi', 'bi-pencil-square', 'text-warning', 'm-1', 'fs-2');
        i.onclick = () => {
            location.href = "modification.php?id=" + element.id;
        }
        td.appendChild(i);

        // Colonne date
        tr.insertCell().innerText = element.dateFr;

        // colonne nom
        tr.insertCell().innerText = element.nom;
    }
    // si le drapeau est vrai il faut afficher le bouton et définir son événement click

}

/**
 *
 * @param id identifiant de l'événement à supprimer
 */
function supprimer(id) {
    msg.innerText = "";
    $.ajax({
        url: 'ajax/supprimer.php',
        type: 'POST',
        data: {id: id},
        dataType: "json",
        success: (data) => {
            
			
			
        },
        error: (reponse) => {
            msg.innerHTML = Std.genererMessage("L'opération a échoué, contacter la maintenance")
            console.error(reponse.responseText)
        }
    })
}


/**
 * Demande de suppression dans l'agenda des événements dont la date est dépassée
 */

function epurer() {
    $.ajax({
        url: 'ajax/epurer.php',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            
			
        },
        error: (reponse) => {
            msg.innerHTML = Std.genererMessage("L'opération a échoué, contacter la maintenance")
            console.error(reponse.responseText)
        }
    })
}