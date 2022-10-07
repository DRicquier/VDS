<?php

$titreFonction = "Liste des documents du Club";
require '../include/initialisation.php';
require RACINE . './include/head.php';
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="DOCadmin.js"></script>

<div>

    <button class="btn btn-primary" type="submit" id="ajouter">Ajouter</button>

    <br>
    <br>
    <div id="main" class="row">
        <div>
            <div class='table-responsive table-hover'>
                <table>
                    <tbody id="lesDonnees"></tbody>
                </table>
            </div>
        </div>
        <div id="ajoutFichier">Ajoute ton fichier ici </div>
    </div>

</div>


<?php require RACINE . '/include/pied.php'; ?>

