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
        success: afficherData
    });
    //Activation des popovers
    new bootstrap.Popover(upload);
    // Déclencher l'ouverture de l'explorateur de fichier lors d'un clic dans la zone cible
    upload.onclick = () => fichier.click();

    // Lancer la fonction controlerFichier si un fichier a été sélectionné dans l'explorateur
    fichier.onchange = () => { if (fichier.files.length > 0) {
        controlerFichier(fichier.files[0]);
        ajouter();
    }};

    upload.ondragover = (e) => e.preventDefault();
    upload.ondrop = (e) => {
        e.preventDefault();
        controlerFichier(e.dataTransfer.files[0]);
        ajouter();
}
    upload.type = "file"
    upload.accept = ".pdf";



    }
    //fonction pour ajouter un document
    function ajouter () {

        if (leFichier == null) {
            Std.AfficherErreur("Vous n'avez pas sélectionné de fichier");
            return;
        }

        let monFormulaire = new FormData();
        monFormulaire.append('fichier', leFichier );
        //Appel coté serveur
        $.ajax({
            url: 'ajax/ajouter.php',
            type: 'POST',
            data: monFormulaire,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function () {
                Std.afficherSucces("Le document a été ajouté");
                //setTimeout("location.reload(true);",2000);
                $.ajax({
                    url: 'ajax/getlesdocsAdmin.php',
                    type: 'GET',
                    dataType: 'json',
                    error: reponse => console.error(reponse.responseText),
                    success: afficherData
                });
                messageCible.innerText = "";
                leFichier = null;
            },
            error: (reponse) => Std.afficherErreur(reponse.responseText)
        })

}
//affiche les données de chaque document
function afficherData(data) {
    document.getElementById("lesDonnees").innerHTML = '';
    for (let documents of data) {
        afficherLesLignes(documents);

    }
}
//affiche la ligne pour le document qui est passé en paramètre
function afficherLesLignes(documents){
    let a = document.getElementById("lesDonnees").insertRow();
    a.classList.add("active","mx-4","my-2");
    a.style.fontSize = "1rem";
    a.style.paddingBottom = "30px";
    a.id = documents.titre;
    let titreF = document.createElement("input");
    titreF.id = documents.id;
    titreF.type = "text";
    titreF.value = documents.titre;
    titreF.required = true;
    titreF.style.height = "40px";
    titreF.style.width = "400px";
    titreF.style.border = "0.5px dashed grey";
    titreF.style.borderRadius = "10px";
    titreF.style.marginRight = "10px";
    titreF.onchange = () => {
        if (!Std.verifier(titreF)) return ;
        $.ajax({
            url: 'ajax/modifiertitre.php',
            type: 'POST',
            data: {titre: titreF.value, id: titreF.id},
            dataType: "json",
            success: function () {
                Std.afficherSucces("Modification enregistrée");
            },
            error: function (request) {
                Std.afficherErreur(request.responseText);
            }
        })
    };
    a.insertCell().appendChild(titreF);
    //création du select
    let typeListe = document.createElement('select');
    typeListe.style.width = "150px";
    typeListe.id = "idDocumentSelectionne" + documents.id;
    typeListe.classList.add('form-select');


    // Je crée un tableau contenant les trois types de fichier
    let touslesTypes = ['Club', '4 saisons', 'Membre'];

    //affiche les types pour chaque document et met par défaut celui qui leur est attribué à l'origine
    for (const type of touslesTypes) {
        let option;
        if (type === documents.type) {
            option = new Option(type, false, true, true);
        } else {
            option = new Option(type);
        }
        typeListe.appendChild(option);
    }

    a.insertCell().appendChild(typeListe);
    // Lorsqu'on selectionne un autre type qui celui d'origine, celui l'envois coté serveur
    // pour q'on le mette à jour dans la base de donnée
    typeListe.onchange = () => {
        if (!Std.verifier(titreF)) return ;
        $.ajax({
            url: 'ajax/modifierClub.php',
            type: 'POST',
            data: {type: typeListe.value, id: titreF.id},
            dataType: "json",
            success: function () {
                Std.afficherSucces("Modification enregistrée");
            },
            error: function (request) {
                Std.afficherErreur(request.responseText)
            }
        })
    };



    // evenement sur le passage de la souris sur les titres
    a.onmouseover = () => {
        a.style.color = "#B0C4DE";
    };
    a.onmouseout = () => {
        a.style.color = "black";
    };

    a.classList.add("active", "mx-4", "my-2");
    a.style.cursor = 'pointer';


    //Afficher un bouton Supprimer
    let buttonSupprimer = document.createElement("button");
    buttonSupprimer.classList.add("btn", "btn-danger");
    buttonSupprimer.setAttribute("id", "supp");
    buttonSupprimer.style.marginLeft = "40px";
    let btnSuppIcon = document.createElement("i");
    btnSuppIcon.classList.add("bi","bi-trash");
    buttonSupprimer.appendChild(btnSuppIcon);
    a.appendChild(buttonSupprimer);

    //fonction du bouton supprimer
    buttonSupprimer.onclick = () => {
        $.ajax({
            url: 'ajax/supprimer.php',
            type: 'POST',
            data: {
                id: documents.id,
            },
            dataType: "json",
            error: (reponse) => Std.afficherErreur(reponse.responseText),
            success:  () => {
                Std.afficherSucces("Le document a été supprimé");
                //setTimeout("location.reload(true);",2000);
                $.ajax({
                    url: 'ajax/getlesdocsAdmin.php',
                    type: 'GET',
                    dataType: 'json',
                    error: reponse => console.error(reponse.responseText),
                    success: afficherData
                });
            }
        });

    }

}

//Fonction qui va controler le document tranmis
function controlerFichier(file) {
    // effacer le message de la zone cible et initialiser la variable leFichier
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