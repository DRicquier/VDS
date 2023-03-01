use vds;

drop table if exists visite;

create table visite
(
    date date primary key,
    nb   int not null default 1
);

-- procédure stockée pour comptabiliser la visite
drop procedure if exists comptabiliserVisite;

create procedure comptabiliserVisite() sql security definer
    begin
        declare _date date;
        set _date = curdate();

        if exists(select 1 from visite where date = _date) then
            update visite
            set nb = nb + 1
            where date = _date;
        else
            insert into visite(date) values (_date);
        end if;
    end;

Select *
from visite;

delete
from visite;


/*
select count(*) from tentative
where (login = 'test' or ip = '::1' )
  and date > now() - interval 10 minute;
*/