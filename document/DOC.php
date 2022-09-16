<?php

$titreFonction = "Liste des documents du Club";
require '../include/initialisation.php';
require RACINE . './include/head.php';
$type = $_GET['type'];
?>

<script>
    "use strict"

    const type = <?php echo json_encode($type);?>;



    window.onload = init;

    function init() {
        $.ajax({
            url: 'ajax/getlesdocs.php?type=' + type,
            type: 'GET',
            dataType: 'json',
            error: reponse => console.error(reponse.responseText),
            success: afficher
        });
    }

    function afficher(data) {
        console.log(data)
        for (let documents of data) {
            let tr = document.getElementById("lesDonnees").insertRow();
            tr.insertCell().innerText = documents.titre;
            console.log(documents)

        }
    }
</script>

<div class="ecuries">
    <div class="row">
        <div>
            <div class='table-responsive'>
                <table>
                    <tbody id="lesDonnees"></tbody>
                </table>
            </div>
        </div>
    </div>

<?php require RACINE . '/include/pied.php'; ?>

