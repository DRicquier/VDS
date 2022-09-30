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


        // partie administrateur
        let buttonModif = document.createElement("button");
        buttonModif.classList.add("btn","btn-warning");
        buttonModif.setAttribute("id","modif");
        buttonModif.style.marginLeft = "100px";
        let btnModifContent = document.createTextNode('Modifier');
        buttonModif.appendChild(btnModifContent);
        a.appendChild(buttonModif);

        let buttonSupprimer = document.createElement("button");
        buttonSupprimer.classList.add("btn","btn-danger");
        buttonSupprimer.setAttribute("id","supp");
        buttonSupprimer.style.marginLeft = "20px";
        let btnSuppContent = document.createTextNode('Supprimer');
        buttonSupprimer.appendChild(btnSuppContent);
        a.appendChild(buttonSupprimer);

        let espace = document.createElement("br");
        a.appendChild(espace);

        //Fonction modifier

    }
}