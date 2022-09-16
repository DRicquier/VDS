
use vds;


CREATE TABLE documents (
	id int AUTO_INCREMENT primary key,
    titre varchar(20) NOT NULL,
    type enum('Club','4 saisons.js','Membre'),
    fichier varchar(25)
);
