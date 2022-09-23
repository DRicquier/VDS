
use vds;
drop table if exists documents ;

CREATE TABLE documents (
	id int AUTO_INCREMENT primary key,
    titre varchar(100) NOT NULL,
    type enum('Club','4 saisons','Membre'),
    fichier varchar(25)
);

insert into documents(titre, type, fichier) 
values ("Règlement intérieur", "Club", "pdf"),
		("les minimas pour les Frances","Club","pdf"),
        ("Les catégories d'âge pour la saison 2022-2023","Club","pdf"),
        ("Autorisation parentale pour adhésion saison 2022-2023","Club","pdf"),
        ("STATUTS VDS 2021","Club","pdf"),
        ("Autorisation parentales 4 saisons","4 saisons", "pdf"),
        ("Parcours du 5 Km","4 saisons","pdf"),
        ("Parcours du 10 Km", "4 saisons","pdf"),
        ("Modèle certificat médical", "4 saisons","pdf"),
        ("tableau des allures pour seance de VS","Membre","pdf"),
        ("tableau des allures pour les Sorties Longues","Membre","pdf");
        
        
