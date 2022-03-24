SELECT DISTINCT fl.film_id
--, inv.inventory_id
, fl.title
, fl.release_year
, fl.rating
, ct.name
, ct.type
, inv.store_id
FROM film AS fl
JOIN film_category AS flct ON fl.film_id = flct.film_id
JOIN category AS ct ON flct.category_id = ct.category_id
JOIN inventory AS inv ON fl.film_id = inv.film_id
WHERE ct.type = 'award'
ORDER BY film_id