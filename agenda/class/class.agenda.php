<?php

// gestion de la table agenda(id, date, nom, description)
// la colonne description est optionnelle

class Agenda extends Table
{
    public function __construct()
    {
        // appel du contructeur de la classe parent
       

        // identifiant de la table
      

        // le nom doit être renseigné,
        // commencer par une lettre ou un chiffre
        // se terminer par une lettre, un chiffre ou !
        // contenir entre 10 et 70 caractères
       

        // la date ne doit pas être inférieure à la date du jour
       

        // la description est optionnelle

        
    }


    // Récupération de tous les enregistrements avec mise en forme de la date et ajout d'un drapeau sur les enregistrements pouvant être supprimés
    public static function getLesEvenements()
    {
        $sql = <<<EOD
			Select id, nom, date_format(date, '%d/%m/%Y') as dateFr
            From agenda
            Order by date desc;
EOD;
        $db = Database::getInstance();
        try {
            $curseur = $db->query($sql);
        } catch (Exception $e) {
            self::$error = $e->getMessage();
            return -1;
        }
        $lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $lesLignes;
    }

    // Récupération des enregistrements à afficher (la date doit être supérieure à la date du jour)
    public static function getLesEvenementsAVenir()
    {
        $sql = <<<EOD
		    Select nom, date_format(date, '%d/%m/%Y') as dateFr, description  
            From agenda
            where date >= curdate() 
            order by date 
EOD;
        $db = Database::getInstance();
        try {
            $curseur = $db->query($sql);
        } catch (Exception $e) {
            self::$error = $e->getMessage();
            return -1;
        }
        $lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $lesLignes;
    }

    // Suppression de tous les enregistrements dont la date est dépassée
    public function epurer() {
        $nb = 
        if ($nb === - 1) {
           $reponse =  ["error" => $this->validationMessage];
        } elseif ($nb === 0) {
            $reponse = ["success" => "Aucun événement concerné"];
        } elseif ($nb === 1) {
            $reponse = ["success" => "Un événement a été supprimé"];
        } else {
            $reponse = ["success" => "$nb événements ont été supprimés"];
        }
        return json_encode($reponse, JSON_UNESCAPED_UNICODE);
    }

    // redéfinition des méthodes de la classe Table



}

