SELECT f.title
	,SUM(p.amount) AS monies
FROM payment AS p
INNER JOIN rental AS r ON p.rental_id = r.rental_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id
INNER JOIN film AS f ON i.film_id = f.film_id
WHERE i.store_id = 2
GROUP BY f.title
ORDER BY monies DESC
-- LIMIT 10
