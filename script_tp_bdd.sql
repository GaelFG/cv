
DROP TABLE passages;
DROP TABLE arrets;
DROP TABLE stations;
DROP TABLE lignes;
DROP TABLE periodes;
-------------------------------
CREATE TABLE stations(
	id		NUMBER PRIMARY KEY, 
	nom		VARCHAR(50)
);

CREATE TABLE lignes(
	id     		NUMBER PRIMARY KEY, 
	intitule	VARCHAR(10)
);

CREATE TABLE periodes(
	id     NUMBER PRIMARY KEY, 
	intitule VARCHAR(30)
);

CREATE TABLE arrets(
	id			NUMBER PRIMARY KEY, 
	id_station	NUMBER,
	id_ligne	NUMBER,
	ordre		NUMBER,
	CONSTRAINT fk_arret_id_station
        FOREIGN KEY(id_station) 
        REFERENCES stations (id),
	CONSTRAINT fk_arret_id_ligne
        FOREIGN KEY(id_ligne) 
        REFERENCES lignes (id)
);

CREATE TABLE passages(
	id_arret   NUMBER, 
 	id_periode NUMBER,
 	horaire	DATE,
 	CONSTRAINT fk_passage_id_arret
        FOREIGN KEY(id_arret) 
        REFERENCES arrets(id),
 	CONSTRAINT fk_passage_id_periode
        FOREIGN KEY(id_periode) 
        REFERENCES periodes(id),
	CONSTRAINT pk_passage
        PRIMARY KEY(id_arret, id_periode, horaire) 
);

-------------------------------------------------

INSERT INTO stations VALUES (1,'Aussonne');
INSERT INTO stations VALUES (2,'République');
INSERT INTO stations VALUES (3,'Tricheries');
INSERT INTO stations VALUES (4,'Mairie Seilh');
INSERT INTO stations VALUES (5,'Blagnac Lycée');
INSERT INTO stations VALUES (6,'Beauzelle');
--
INSERT INTO lignes VALUES (1,'71');
INSERT INTO lignes VALUES (2,'46');
--
INSERT INTO periodes VALUES (1,'Lundi à Vendredi');
INSERT INTO periodes VALUES (2,'Samedi');
INSERT INTO periodes VALUES (3,'Dimanche et jours fériés');
--
INSERT INTO arrets VALUES (1,1,1,1);
INSERT INTO arrets VALUES (2,4,1,2);
INSERT INTO arrets VALUES (3,5,1,3);
INSERT INTO arrets VALUES (4,2,2,1);
INSERT INTO arrets VALUES (5,4,2,2);
INSERT INTO arrets VALUES (6,6,2,3);
--
INSERT INTO passages VALUES (1,1,TO_DATE('01-01-2004 06:05:00','DD-MM-YYYY HH24:MI:SS'));
INSERT INTO passages VALUES (2,1,TO_DATE('01-01-2004 06:10:00','DD-MM-YYYY HH24:MI:SS'));
INSERT INTO passages VALUES (3,1,TO_DATE('01-01-2004 06:15:00','DD-MM-YYYY HH24:MI:SS'));
INSERT INTO passages VALUES (4,1,TO_DATE('01-01-2004 07:07:00','DD-MM-YYYY HH24:MI:SS'));
INSERT INTO passages VALUES (5,1,TO_DATE('01-01-2004 07:17:00','DD-MM-YYYY HH24:MI:SS'));
INSERT INTO passages VALUES (6,1,TO_DATE('01-01-2004 07:27:00','DD-MM-YYYY HH24:MI:SS'));
--
COMMIT;
-- 

SELECT * FROM stations;
SELECT * FROM periodes;
