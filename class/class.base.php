<?php

class Base
{
    /**
     * @return string|null : Retourne le texte du bandeau qui peut être vide
     */
    public static function getLeBandeau(): string | null
    {
        $db = Database::getInstance();
        $sql = "Select contenu From bandeau;";
        $curseur = $db->query($sql);
        $contenu = $curseur->fetchColumn();
        $curseur->closeCursor();
        return $contenu;
    }



    /**
     * @param int $id identifiant du membre
     * @return array liste des modules dont le membre a en charge la gestion
     */
    public static function getLesModules(int $id): array
    {
        $db = Database::getInstance();
        $sql = <<<EOD
            Select repertoire, nom, description
            From module
            where repertoire in (select repertoire from droit
                                 where idMembre = :idMembre)
            Order by nom;
EOD;
        $curseur = $db->prepare($sql);
        $curseur->bindParam('idMembre', $id);
        $curseur->execute();
        $lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $lesLignes;
    }
    public  static function getLesMembres() : array  {
        $mois = date('m');
        $annee = date('Y');
        // l'année de référence sera l'année n + 1 si on se trouve après le mois de référence
        if ($mois >= 9) $annee++;
        $db = Database::getInstance();
        // $curseur = $this->db->query("call getLesCategories($annee)");
        $curseur = $db->prepare("call getLesCategories(:annee)");
        $curseur->bindParam('annee', $annee);
        $curseur->execute();
        $lesLignes = $curseur->fetchAll(PDO::FETCH_NUM);
        $curseur->closeCursor();
        return $lesLignes;
    }
}