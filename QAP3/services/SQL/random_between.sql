-- FUNCTION: public.random_between(integer, integer)

-- DROP FUNCTION public.random_between(integer, integer);

CREATE OR REPLACE FUNCTION public.random_between(
	low integer,
	high integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$BODY$;

ALTER FUNCTION public.random_between(integer, integer)
    OWNER TO postgres;
