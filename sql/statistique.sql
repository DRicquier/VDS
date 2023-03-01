use vds;

drop table if exists statistique;

create table statistique(
    nom varchar(100) not null primary key,
    nb int not null default 1
);


-- procédure stockée pour comptabiliser la visite
drop procedure if exists majStatistique;

create procedure majStatistique(_nom varchar(100)) sql security definer
begin
    if exists(select 1 from statistique where nom = _nom) then
        update statistique
        set nb = nb + 1
        where nom = _nom;
    else
        insert into statistique(nom) values (_nom);
    end if;
end;

Select *
from visite;

delete
from visite;