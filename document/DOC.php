<?php

$titreFonction = "Liste des documents du Club";
require '../include/initialisation.php';
require RACINE . './include/head.php';
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="DOC.js"></script>

<div>
    <div class="row">
        <div>
            <div class='table-responsive table-hover'>
                <table style="margin-left: 30px">
                    <tbody id="lesDonnees"></tbody>
                </table>

            </div>
        </div>
    </div>
</div>


<?php require RACINE . './include/pied.php'; ?>

