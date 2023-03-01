use vds;

show create table membre;

-- ajouter un champ nbConnexion sur la table membre

alter table membre
    add column nbConnexion int not null default 0;

select id, nbConnexion
from membre;

-- procédure de mise à jour de la colonne nbConnexion

drop procedure if exists enregistrerNbConnexion;

create procedure enregistrerNbConnexion(_id int)
    sql security definer
begin
    update membre
    set membre.nbConnexion = membre.nbConnexion + 1
    where id = _id;
end;

call enregistrerNbConnexion(1);