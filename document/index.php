<?php

$titreFonction = "Liste des documents";
require '../include/initialisation.php';
require RACINE . './include/head.php';
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="DOCadmin.js"></script>

<div>


    <div id="main" class="row" style="padding: 20px">
        <div style ="clear: both;">
            <div id="upload" class="upload text-center" style="width: 300px;height: 150px ; border-radius: 8px; margin-left: 7%"
                 data-bs-trigger="hover"
                 data-bs-html="true"
                 data-bs-title="<b>Règles à respecter<b>"
                 data-bs-content="<strong>Pdf uniquement<strong><br>Taille limitée à 1 Mo">
                <i class="bi bi-cloud-upload" style="font-size: 4rem; color: #8b8a8a;"></i>
                <div>Cliquez ou déposer le document PDF que vous voulez ajouter</div>
                <span id='messageCible'></span>
            </div>
            <br>
            <br>
            <div class='table-responsive table-hover' style="width: 800px; float: left">
                <table style="margin-left: 30px">
                    <tbody id="lesDonnees"></tbody>
                </table>
            </div>
            <input type="file" id="fichier" name="file" accept=".pdf" style='display: none '>

    </div>

</div>


<?php require RACINE . '/include/pied.php'; ?>

