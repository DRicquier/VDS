"use strict"

// fichier téléversé
let leFichier = null;

window.onload = init;

function init() {
    $.ajax({
        url: 'ajax/getlesdocsAdmin.php',
        type: 'GET',
        dataType: 'json',
        error: reponse => console.error(reponse.responseText),
        success: afficher
    });
    //Activation des popovers
    new bootstrap.Popover(upload);
    upload.style.visibility = "hidden";
    // Déclencher l'ouverture de l'explorateur de fichier lors d'un clic dans la zone cible
    upload.onclick = () => fichier.click();

    // Lancer la fonction controlerFichier si un fichier a été sélectionné dans l'explorateur
    fichier.onchange = () => { if (fichier.files.length > 0) {
        controlerFichier(fichier.files[0]);
        valider.style.visibility = fichier == null ? "hidden" : "visible";
    }};

    upload.ondragover = (e) => e.preventDefault();
    upload.ondrop = (e) => {
        e.preventDefault();
        controlerFichier(e.dataTransfer.files[0]);
}

function afficher(data) {
    console.log(data)

    afficherData(data);

    let ajouterFichier = document.getElementById("ajoutFichier");
    ajouterFichier.style.visibility = "hidden";

    let valider = document.getElementById("valider");
    valider.classList.add('btn', 'btn-success');
    valider.style.marginLeft = '28%';
    valider.style.visibility = "hidden";

    }

    upload.type = "file"
    upload.accept = ".pdf";
    upload.style.visibility = "hidden";


    let ajouterFichier = document.getElementById("ajoutFichier");
    ajouterFichier.style.visibility = "hidden";

    //Afficher un bouton ajouter
    let buttonAjouter = document.getElementById('ajouter');
    buttonAjouter.classList.add('btn', 'btn-success');
    buttonAjouter.style.marginLeft = '28%';
    buttonAjouter.onclick = (e) => {

        //condition d'affichage
        if(buttonAjouter.classList.contains('btn-success')){
            buttonAjouter.classList.remove('btn-success');
            buttonAjouter.classList.add('btn-danger');
            buttonAjouter.innerText = 'Annuler';
        }
        else{
            buttonAjouter.classList.add('btn-success');
            buttonAjouter.classList.remove('btn-danger');
            buttonAjouter.innerText = 'Ajouter';
        }

        if (ajouterFichier.style.visibility == "hidden") {
            ajouterFichier.style.visibility = "visible";
            console.log("none");
        } else {
            ajouterFichier.style.visibility = "hidden";
            valider.style.visibility = "hidden";
            console.log("pas none");
        }
        if(upload.style.visibility == "hidden"){
            upload.style.visibility = "visible";
        }else {
            upload.style.visibility = "hidden";

        }


    }

    valider.onclick = () => {


        if (leFichier == null) {
            Std.AfficherErreur("Vous n'avez pas sélectionné de fichier");
            return;
        }
        const typeFichier = document.location.search.split('=');
        console.log(typeFichier[1]);
        let typeDeFichier = typeFichier[1].toString();
        console.log(typeof(typeDeFichier));
        /*
        let leSeulFichier = fichier.files[0];
        let nomFichier = leSeulFichier.name;
        const split = nomFichier.split(".");
        let titreFichier = split[0];
        let extFichier = split[1];

         */

        let monFormulaire = new FormData();
        monFormulaire.append('fichier', leFichier );

        $.ajax({
            url: 'ajax/ajouter.php',
            type: 'POST',
            data: monFormulaire,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function () {
                Std.afficherSucces("Le document a été ajouté");
                setTimeout("location.reload(true);",2000);

            },
            error: (reponse) => Std.afficherErreur(reponse.responseText)
        })
    }
}

function afficherData(data) {
    for (let documents of data) {
        let a = document.getElementById("lesDonnees").insertRow();
        a.classList.add("active","mx-4","my-2");
        a.id = documents.titre;
        let titreF = document.createElement("input");
        titreF.id = documents.id;
        titreF.type = "text";
        titreF.value = documents.titre;
        titreF.required = true;
        titreF.style.height = "40px";
        titreF.style.width = "400px";
        a.insertCell().appendChild(titreF);



        // evenement sur le passage de la souris sur les titres
        a.onmouseover = () => {
            a.style.color = "#B0C4DE";
        };
        a.onmouseout = () => {
            a.style.color = "black";
        };

        a.classList.add("active", "mx-4", "my-2");
        a.style.cursor = 'pointer';


        // partie administrateur

        //Afficher un bouton Modifier
        let buttonModif = document.createElement("button");
        buttonModif.classList.add("btn", "btn-warning");
        buttonModif.setAttribute("id", "modif");
        buttonModif.style.marginLeft = "40px";
        let btnModifContent = document.createTextNode('Modifier');
        buttonModif.appendChild(btnModifContent);
        a.appendChild(buttonModif);

        //Afficher un bouton Supprimer
        let buttonSupprimer = document.createElement("button");
        buttonSupprimer.classList.add("btn", "btn-danger");
        buttonSupprimer.setAttribute("id", "supp");
        buttonSupprimer.style.marginLeft = "40px";
        let btnSuppContent = document.createTextNode('Supprimer');
        buttonSupprimer.appendChild(btnSuppContent);
        a.appendChild(buttonSupprimer);

        buttonSupprimer.onclick = () => {
            $.ajax({
                url: 'ajax/supprimer.php',
                type: 'POST',
                data: {
                    nomFichier: documents.titre,
                },
                dataType: "json",
                error: (reponse) => Std.afficherErreur(reponse.responseText),
                success:  () => {
                    Std.afficherSucces("Le document a été supprimé");
                    setTimeout("location.reload(true);",2000);
                }
            });

        }
    }


}
function controlerFichier(file) {
    // effacer le message de la zone clble et initialiser la variable leFichier
    messageCible.innerHTML = "";
    messageCible.classList.remove('messageErreur');
    leFichier = null;

    // contrôle de la taille
    let taille = 1 * 1024 * 1024;
    if(file.size > taille) {
        messageCible.innerText = "La taille du fichier dépasse la taille autorisée"
        messageCible.classList.add("messageErreur");
        return false;
    }

    // contrôle de l'extension

    let lesExtensions = ['pdf'];
    // récupération de l'extension : découpons au niveau du '.' et prenons le dernier élement
    let eltFichier = file.name.split('.');
    let extension = eltFichier[eltFichier.length - 1].toLowerCase();
    if(lesExtensions.indexOf(extension) === -1) {
        messageCible.innerText = "Cette extension de fichier n'est pas acceptée";
        messageCible.classList.add("messageErreur");
        return false;
    }

    // affichage du nom du fichier téléversé et mémorisation du fichier dans la variable leFichier
    messageCible.innerText = file.name;
    leFichier = file;

}