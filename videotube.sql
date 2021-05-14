drop database if exists vt;
create database vt;
use vt;
-- creazione tabelle
CREATE table spettatore(
	hash int auto_increment PRIMARY KEY,
    name varchar(32),
    surname varchar(32),
  	username varchar(32),
    email varchar(64),
    password varchar(64),
    profile_pic varchar(255),
    anno_iscrizione year,
    INDEX index_hash(hash));

CREATE table creator(
	hash int auto_increment PRIMARY KEY,
    name varchar(32),
    surname varchar(32),
	  username varchar(32),
    email varchar(64),
    password varchar(64),
    profile_pic varchar(255),
    anno_iscrizione year,
    n_followers int,
    INDEX index_hash(hash));

CREATE table premium(
	hash int PRIMARY KEY,
    costo decimal,
    mensile decimal,
    tipo varchar(16),
    FOREIGN KEY(hash) REFERENCES spettatore(hash) on delete cascade,
    INDEX index_premium(hash));
  
CREATE table video(
    titolo varchar(20),
    immagine varchar(255),
    creator int,
    descrizione varchar(255),
    id int auto_increment PRIMARY KEY,
    tipo varchar(32),
    src varchar(255),
    pubblicazione date,
    FOREIGN KEY(creator) REFERENCES creator(hash) on delete cascade,
    INDEX index_video(id));

CREATE table feedback(
    spettatore int,
    video int,
    tipo boolean,
    PRIMARY KEY(spettatore, video),
    FOREIGN KEY(spettatore) REFERENCES spettatore(hash) on update cascade,
    FOREIGN KEY(video) REFERENCES video(id) on update cascade,
    INDEX f_spettatore(spettatore));

CREATE table abbonamento(
    premium int PRIMARY KEY,
    creator int,
    inizio date,
    FOREIGN KEY(creator) REFERENCES creator(hash) on delete cascade,
    FOREIGN KEY(premium) REFERENCES premium(hash) on delete cascade,
    INDEX ab_premium(premium),
    INDEX ab_creator(creator));

CREATE table abbonamenti_precedenti(
    premium int,
    creator int,
    inizio date,
    fine date,
    PRIMARY KEY(premium, inizio),
    FOREIGN KEY(premium) REFERENCES premium(hash) on update cascade,
    FOREIGN KEY(creator) REFERENCES creator(hash) on update cascade,
	  INDEX ap_premium(premium),
    INDEX ap_creator(creator));

CREATE table segue(
    spettatore int,
    creator int,
    inizio date,
    PRIMARY KEY(spettatore, creator),
    FOREIGN KEY(creator) REFERENCES creator(hash) on delete cascade,
    FOREIGN KEY(spettatore) REFERENCES spettatore(hash) on delete cascade,
	  INDEX s_spettatore(spettatore),
    INDEX s_creator(creator));


CREATE table guarda(
    spettatore int,
    video int,
    PRIMARY KEY(spettatore, video),
    FOREIGN KEY(spettatore) REFERENCES spettatore(hash) on delete cascade,
    FOREIGN KEY(video) REFERENCES video(id) on delete cascade,
    INDEX g_video(video),
	  INDEX g_spettatore(spettatore));
/*
-- creazione delle procedure
delimiter //

create procedure tendenza(IN soglia int)
  begin
	drop table if exists in_tendenza;
    create temporary table in_tendenza(
		    id_video int,
        video varchar(16),
        views int);
	insert into in_tendenza
		select id_video, video, views from visual_video where views>=soglia;
	select * from in_tendenza;
  end//
*/

delimiter //

create procedure chi_segue (IN hash_spettatore int)
  begin
  drop table if exists follow;
  create temporary table follow(
    hash int,
    username varchar(16),
    profile_pic varchar(255),
    data date);
  insert into follow
    select c.hash, c.username, c.profile_pic, s.inizio from segue s join creator c on s.creator = c.hash
      where s.spettatore = hash_spettatore;
	select * from follow;
  end //

delimiter ;

/*

create procedure abbonamenti_fatti (IN hash_premium int)
  begin
	drop table if exists abbonamenti_t;
	create temporary table abbonamenti_t(
		creator int,
		username varchar(16),
		inizio date,
		fine date);
	insert into abbonamenti_t
		select a.creator, c.username, a.inizio, null from abbonamento a join creator c on a.creator = c.hash
			where a.premium=hash_premium;
	insert into abbonamenti_t
		select a.creator, c.username, a.inizio, a.fine from abbonamenti_precedenti a join creator c on a.creator = c.hash
			where a.premium=hash_premium;
	select * from abbonamenti_t;
  end //

create procedure codice_sconto(IN creator_id int)
  begin
	update premium
		set costo = costo-costo*0.2,
			mensile = CASE tipo
						when 'mensile' then costo
						when 'annuale' then costo/12
						when 'settimanale' then costo*4
						else null
					  end
        where hash in (select premium from abbonamento where creator=creator_id);
  end //

create procedure follower_c(IN intrattenitore int, OUT seguaci int)
  begin
	set seguaci = (select n_followers from creator where hash=intrattenitore);
    select seguaci;
  end //

create procedure seguaci_anno(IN intrattenitore int)
  begin
	drop table if exists seguaci;
    create temporary table seguaci(
		numero_seguaci int,
        anno year);
	insert into seguaci
		select count(spettatore), year(inizio) from segue where
			creator = intrattenitore group by year(inizio);
	select * from seguaci;
  end//


delimiter ;
*/

-- creazione viste

create view visual_video as
  select video as id_video, titolo as video, count(spettatore) as views from video join guarda
    on video.id = guarda.video group by video.id order by views desc;
/*
create view feedback_lasciati as
	select s.hash as hash, s.username as spettatore, count(f.numero) as feedback
	from spettatore s join  feedback f on s.hash = f.hash group by hash;

create view playlist_pubblicate as
	select c.hash as hash, c.username as creator, count(p.playlist) as playlists
	from creator c join  pubblica p on p.creator = c.hash group by c.username;


-- triggers

create trigger aggiorna_abbonamenti
	after delete on abbonamento
    for each row
		insert into abbonamenti_precedenti values (old.premium, old.creator, old.inizio, current_date());

*/
create trigger add_follower
	after insert on segue
    for each row
	update creator
        set n_followers = n_followers+1 where hash = new.creator;

create trigger remove_follower
	after delete on segue
    for each row
	update creator
        set n_followers = n_followers-1 where hash = old.creator;
/*
delimiter //
create trigger is_premium
	before insert on abbonamento
    for each row
    begin
		declare msg varchar(255);
		if new.premium not in (select hash from premium)
			then set msg = "L'utente non e\' premium, quindi non può sottoscrivere un abbonamento";
				signal sqlstate '45000' set message_text=msg;
		end if;
	end //

create trigger gia_abbonato
	before insert on abbonamento
    for each row
    begin
		declare msg varchar(255);
		if new.premium in (select premium from abbonamento)
			then set msg = "L'utente e\' gia\' abbonato ad un canale, prima disdire la sub";
				signal sqlstate '45000' set message_text=msg;
		end if;
	end //

create trigger controllo_costi
	before insert on premium
    for each row
    begin
		declare msg varchar(255);
        set msg = "errore nel conteggio del costo, rivedi l'immissione";
		if new.tipo='mensile'
			then if new.costo <> new.mensile
					then signal sqlstate '45000' set message_text=msg;
					end if;
		elseif new.tipo='annuale'
			then if new.costo <> new.mensile*12
					then signal sqlstate '45000' set message_text=msg;
					end if;
		elseif new.tipo='settimanale'
			then if new.costo <> new.mensile/4
					then signal sqlstate '45000' set message_text=msg;
					end if;
		else
			set msg = "non esiste questo tipo di abbonamento";
			signal sqlstate '45000' set message_text=msg;
		end if;
	end //
delimiter ;
*/