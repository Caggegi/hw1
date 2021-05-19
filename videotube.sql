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


CREATE table preferiti(
    spettatore int,
    video int,
    PRIMARY KEY(spettatore, video),
    FOREIGN KEY(spettatore) REFERENCES spettatore(hash) on delete cascade,
    FOREIGN KEY(video) REFERENCES video(id) on delete cascade,
    INDEX p_video(video),
	  INDEX p_spettatore(spettatore));

INSERT INTO creator(hash, name, surname, username, email, password, profile_pic, anno_iscrizione, n_followers)
  VALUES (1, 'Riot Games','','RiotGames','riot@riot.com','86caecb0afacb8361ac7b2a84b71f30e5757470f4dc77be0880f745521ea9cb1','https://riot.com/3eWZq3P',current_date(),'0'),
         (2, 'Mihoyo','','Mihoyo','tousu@mihoyo.com','2c168da20b2a8f34944edcce76120f0a150829ca8505af5fe1882dfaa576a3a4','https://bit.ly/3uSaaGd',current_date(),'0'),
         (3, 'CD-Projekt RED','','CDP','projektred@cd.com','5a25c5b4d069a6c99ba5a1e0db3dba088f6be3e23f84f5e8e36bac74c0d7fdb4','https://bit.ly/2QuGoZe',current_date(),'0'),
         (4, 'Disney','','Disney','topolino@disney.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/347zKeN',current_date(),'0'),
         (5, 'Disney Pixar','','Pixar','pixar@disney.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3ftEuAl',current_date(),'0'),
         (6, 'CGI','','CGI','cgianimated@cgi.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3ynefo7',current_date(),'0'),
         (7, 'Francesca','Calearo','Madame','sonolamadame@gmail.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3bzpxMg',current_date(),'0'),
         (8, 'Andrea','Molteni','Axos','axos.studio@gmail.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3v1a0MV',current_date(),'0'),
         (9, 'Michele','Salvemini','Caparezza','caparezza@gmail.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3tYcRVv',current_date(),'0'),
         (10, 'Universe Science Italy','','UniverseScienceItaly','usitaly@cd.com','d1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04','https://bit.ly/3ytVsHR',current_date(),'0');

INSERT INTO video (titolo, immagine, creator, descrizione, tipo, src, pubblicazione) 
  VALUES ('Genshin Impact', 'https://bit.ly/3eYB35Y', 2, 'Prologue:  The Outlander Who Caught the Wind I: Farewell, Archaic Lord II:  Omnipresence Over Mortals', 'gameplay', 'TAlKhARUcoY', current_date()),
         ('Warriors - LoL', 'https://bit.ly/2S16YcW', 1, 'Noi siamo guerrieri. La stagione 2020 è iniziata.', 'gameplay', 'aR-KAldshAE', current_date()),
         ('Cyberpunk 2077', 'https://bit.ly/3u3769a', 3, 'CD PROJEKT RED ha mostrato oggi un nuovo video di Cyberpunk 2077 dando ai giocatori un nuovo sguardo...', 'gameplay', '2qGCax2Chik', current_date()),
         ('Il re leone', 'https://bit.ly/3fpvk89', 4, 'Ivana Spagna is awesome. Circle of Life, in Italian.', 'film', 'rsL15hjSELM', current_date()),
         ('Bao', 'https://bit.ly/3eXGWAk', 5, 'Follow US on Social Media!', 'film', '7xTmyUdqDfM', current_date()),
         ('Scrambled', 'https://bit.ly/3fnjKdE', 6, 'CGI 3D Animated Short Film: Scrambled Animated Short Film by Polder Animation. Featured on CGMeetup https://www.cgmeetup.com/polderanimation ', 'film', '9JBNmGlEdLY',current_date()),
         ('VOCE', 'https://bit.ly/3otsDGL', 7, 'Ascolta “MADAME”, il primo album di Madame: https://SugarMusic.lnk.to/_MADAME', 'musica', 'cFAtUbi7a8w', current_date()),
         ('SCICCHERIE', 'https://bit.ly/33VaGY4', 7, 'Ascolta “MADAME”, il primo album di Madame: https://SugarMusic.lnk.to/_MADAME', 'musica', '5zxDFB6CS3g', current_date()),
         ('La Scelta', 'https://bit.ly/3fwbuYX', 9, 'Ascolta ora La Scelta http://pld.lnk.to/lascelta Preordina il nuovo album in uscita il 7 Maggio qui https://pld.lnk.to/ExuviaID', 'musica', 'D8ZVhvXqUzI', current_date()),
         ('Settimo Cielo', 'https://bit.ly/3weltsp', 8, 'Provided to YouTube by Universal Music Group Settimo Cielo · Axos · Ghemon', 'musica', 'SwL81onti2I', current_date()),
         ("L'Era dei Mammiferi", 'https://bit.ly/3v2ownr', 10, "I crediti di qualsiasi artista che abbia realizzato le immagini utilizzate, sono riportate in basso a sinistra nel video. Qualunque altra immagine riportata senza credito, o è senza copyright oppure non siamo riusciti a trovare l'autore dell'immagine, se sapete eventualmente di chi sono le immagini senza credito, per piacere segnalatecelo nei commenti e noi lo aggiungeremo nella descrizione del video.", 'altro', '5rEhSYf_WL0', current_date());

INSERT INTO spettatore(name, surname, username, email, password, profile_pic, anno_iscrizione)
  VALUES ('Mario', 'Rossi', 'mrossi', 'mariorossi@gmail.com', 'd1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04', 'https://bit.ly/3w8Fa4W', YEAR(current_date())),
         ('Giuseppe', 'Verdi', 'greenG', 'ilverdi@gmail.com', 'd1fdc211f5414e6974317921f57c89e9a7c41def55d3fc7befa436efb8ac7c04', 'https://bit.ly/3opewC8', YEAR(current_date()));

INSERT INTO segue VALUES (1, 1, current_date()),
                         (1, 2, current_date()),
                         (2, 3, current_date());

delimiter //

create view small_ht as
  (select p.video, count(p.spettatore) as likes
    from video v join preferiti p on v.id = p.video group by v.id);

create view hot_topic as select * from video v join small_ht h on v.id=h.video;

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
	select * from follow ORDER BY username;
  end //

  create procedure is_supporter (IN hash_premium int)
  begin
    SELECT creator FROM abbonamento where premium=hash_premium;
  end //

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

delimiter ;
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

create trigger aggiorna_abbonamenti
	after delete on abbonamento
    for each row
		insert into abbonamenti_precedenti values (old.premium, old.creator, old.inizio, current_date());

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