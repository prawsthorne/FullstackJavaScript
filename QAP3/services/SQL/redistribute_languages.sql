-- PROCEDURE: public.redistribute_languages(integer, integer)

-- DROP PROCEDURE public.redistribute_languages(integer, integer);

CREATE OR REPLACE PROCEDURE public.redistribute_languages(
	"LanguageId" integer,
	"Instances" integer)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE filmsArr integer[];
		i integer;
	BEGIN
		SELECT ARRAY(SELECT random_between(1,1000) FROM generate_series(1,"Instances")) INTO filmsArr;
		FOREACH i IN ARRAY filmsArr LOOP
                UPDATE film SET language_id ="LanguageId" WHERE film_id=i;
        END LOOP;
	END
$BODY$;
