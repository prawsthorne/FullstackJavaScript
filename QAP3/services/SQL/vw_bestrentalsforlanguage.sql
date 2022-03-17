-- View: public.vw_bestrentalsforlanguage

-- DROP VIEW public.vw_bestrentalsforlanguage;

CREATE OR REPLACE VIEW public.vw_bestrentalsforlanguage
 AS
 SELECT f.title,
    l.name,
    i.store_id,
    sum(p.amount) AS monies
   FROM payment p
     JOIN rental r ON p.rental_id = r.rental_id
     JOIN inventory i ON r.inventory_id = i.inventory_id
     JOIN film f ON i.film_id = f.film_id
     JOIN language l ON f.language_id = l.language_id
  GROUP BY f.title, l.name, i.store_id
  ORDER BY (sum(p.amount)) DESC;

ALTER TABLE public.vw_bestrentalsforlanguage
    OWNER TO postgres;

