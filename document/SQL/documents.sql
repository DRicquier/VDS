set sql_mode = 'traditional';
use vds;
drop table if exists documents ;

CREATE TABLE documents (
	id int AUTO_INCREMENT primary key,
    titre varchar(100) NOT NULL,
    type enum('Club','4 saisons','Membre'),
    fichier varchar(200),
    dateVersion timestamp NOT NULL default current_timestamp
);

insert into documents(titre, type, fichier)
values ("les minimas pour les Frances","Club","pdf"),
       ("Parcours du 5 Km","4 saisons","Parcours du 5 Km.pdf"),
       ("Parcours du 10 Km", "4 saisons","Parcours du 10 Km.pdf"),
       ("Autorisation parentales 4 saisons","4 saisons", "Autorisation parentales 4 saisons.pdf"),
       ("Modèle certificat médical", "4 saisons","Modèle certificat médical.pdf"),
       ("tableau des allures pour seance de VS","Membre","tableau des allures pour seance de VS.pdf"),
       ("tableau des allures pour les Sorties Longues","Membre","tableau des allures pour les Sorties Longues.pdf");

insert into documents(titre, type, fichier, dateVersion)
values ("Règlement intérieur", "Club", "pdf","2021-11-19"),
        ("Les catégories d'âge pour la saison en cours","Club","Les catégories d'âge pour la saison 2022-2023.pdf",'2022-09-01'),
        ("Autorisation parentale pour adhésion saison en cours","Club","Autorisation parentale pour adhésion saison 2022-2023.pdf",'2022-06-01'),
        ("Status Vds 2021","Club","STATUTS VDS 2021.pdf",'2022-11-19');
        
        
Select * from documents;
