<?php

$titreFonction = "Liste des documents du Club";
require '../include/initialisation.php';
require RACINE . './include/head.php';
$type = $_GET['type'];
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
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
            let a = document.getElementById("lesDonnees").insertRow();
            a.insertCell().innerText = documents.titre;
            a.onclick = () => {
                window.location.href = '../data/document/' + documents.titre + "." + documents.fichier;
            };
            a.classList.add("active","mx-4","my-2");
            a.style.cursor='pointer';

            let button = document.createElement("button");
            button.classList.add("btn","btn-danger");
            button.style.marginLeft = "100px";
            a.appendChild(button);
            console.log(documents)


        }
    }
</script>

<div class="ecuries">
    <div class="row">
        <div>
            <div class='table-responsive table-hover'>
                <table>
                    <tbody id="lesDonnees"></tbody>
                </table>

            </div>
        </div>
    </div>
</div>


<?php require RACINE . '/include/pied.php'; ?>

