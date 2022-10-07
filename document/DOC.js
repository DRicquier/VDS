"use strict"

window.onload = init;

function init() {
    $.ajax({
        url: 'ajax/getlesdocs.php' + document.location.search,
        type: 'GET',
        dataType: 'json',
        error: reponse => console.error(reponse.responseText),
        success: afficher
    });
}

function afficher(data) {
    console.log(data)
    for (let documents of data) {
        let a = document.getElementById("lesDonnees").insertRow();
        a.insertCell().innerText = documents.titre;

        // evenement sur le passage de la souris sur les titres
        a.onmouseover = () => { a.style.color = "#B0C4DE"; };
        a.onmouseout = () => { a.style.color = "black"; };

        // evenement sur le clique
        a.onclick = () => {
            window.location.href = '../data/document/' + documents.fichier;
        };
        a.classList.add("active","mx-4","my-2");
        a.style.cursor='pointer';

    }
}