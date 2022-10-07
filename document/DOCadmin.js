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

    afficherData(data);

    //Afficher un bouton ajouter
    let buttonAjouter = document.getElementById('ajouter');
    buttonAjouter.classList.add('btn','btn-success');
    buttonAjouter.style.marginLeft = '28%';

    let ajouterFichier = document.getElementById("ajoutFichier");
    ajouterFichier.style.visibility = "none";
    ajouterFichier.onclick = (e) => {
        let valider = document.createElement("button");
        valider.classList.add('btn','btn-success');
        valider.style.marginLeft = '28%';
        let valideContent = document.createTextNode('Valider');
        valider.appendChild(valideContent);
    }

    let upload = document.createElement('input');
    upload.type = "file"
    upload.accept = "application/pdf";
    upload.style.visibility = "none";

    ajouterFichier.appendChild(upload);

    buttonAjouter.onclick= () => {
        let ajouterFicher = document.getElementById("ajoutFichier");
        if (ajouterFicher.style.visibility == "none") {
            ajouterFicher.style.visibility = "visible";
        } else {
            ajouterFicher.style.visibility = "none";
        }
    }
}

function afficherData(data) {
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

        //Afficher un bouton Modifier
        let buttonModif = document.createElement("button");
        buttonModif.classList.add("btn","btn-warning");
        buttonModif.setAttribute("id","modif");
        buttonModif.style.marginLeft = "100px";
        let btnModifContent = document.createTextNode('Modifier');
        buttonModif.appendChild(btnModifContent);
        a.appendChild(buttonModif);

        //Afficher un bouton Supprimer
        let buttonSupprimer = document.createElement("button");
        buttonSupprimer.classList.add("btn","btn-danger");
        buttonSupprimer.setAttribute("id","supp");
        buttonSupprimer.style.marginLeft = "20px";
        let btnSuppContent = document.createTextNode('Supprimer');
        buttonSupprimer.appendChild(btnSuppContent);
        a.appendChild(buttonSupprimer);
    }
}