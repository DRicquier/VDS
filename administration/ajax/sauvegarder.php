<?php
$racine = $_SERVER['DOCUMENT_ROOT'];

$dbHost = 'localhost';
$dbUser = 'root';
$dbPassword = '';
$dbBase = 'vds';

$date = date('Y-m-d');
$fichier = "$racine/data/sauvegarde/$date.sql";

/*
 * Version simple
$cmd = "J:\wamp64\bin\mysql\mysql8.0.29\bin\mysqldump --host=$dbHost --user=$dbUser --password=$dbPassword $dbBase --databases --add-drop-database -R > $fichier";

// lancer la commande mysqldump contenu dans $cmd
//echo system($command);
system($cmd);
*/

require "$racine/vendor/autoload.php";
use Ifsnop\Mysqldump as IMysqldump;

$Parametres = [
    'add-drop-database' => true,
    'add-drop-trigger' => false,
    'databases' => true,
    'routines' => true,
    'skip-definer' => true
];

try {
    $dump = new IMysqldump\Mysqldump("mysql:host=$dbHost;dbname=$dbBase", $dbUser, $dbPassword, $Parametres);
    $dump->start("$fichier");
} catch (\Exception $e) {
    echo 'La sauvegarde a échoué: ' . $e->getMessage();
    exit;
}

//transfert
//envoi de la sauvegarde sur un serveur FTP
$connexion = ftp_connect('ftp-ricquier.alwaysdata.net',21,90);
ftp_login($connexion, 'ricquier', 'B4x0PXVzqyc3MpKWkfNG');
ftp_pasv($connexion, true);
ftp_put($connexion, "/sauvegarde/$date.sql", $fichier, FTP_ASCII);

if(ftp_put($connexion, "/sauvegarde/$date.sql", "$racine/data/sauvegarde/$date.sql"))
    echo 1;
else
    echo 'La sauvegarde a réussi mais son exportation a échoué';

ftp_close($connexion);

// le fichier est vide (taille 0) si la commande n'a pas fonctionné
if(filesize($fichier) === 0) {
    echo 'La sauvegarde a échoué : ';
    @unlink($fichier);
} else {
    echo json_encode($fichier);
}



