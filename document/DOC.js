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
        let icon = document.createElement("i");
        icon.classList.add("bi","bi-file-pdf");
        a.appendChild(icon)

        a.insertCell().innerText = documents.titre;
        a.style.height = "30px";
        a.style.verticalAlign = "top";

        // evenement sur le passage de la souris sur les titres
        a.onmouseover = () => { a.style.color = "#B0C4DE"; };
        a.onmouseout = () => { a.style.color = "black"; };

        // evenement sur le clique
        a.onclick = () => {
            window.location.href = '../data/document/' + documents.fichier;
        };

        a.classList.add("active","col-sm-3");
        a.style.cursor='pointer';

    }
}