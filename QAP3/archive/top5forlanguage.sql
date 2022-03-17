SELECT f.title, l.name
	,SUM(p.amount) AS monies
FROM payment AS p
INNER JOIN rental AS r ON p.rental_id = r.rental_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id
INNER JOIN film AS f ON i.film_id = f.film_id
INNER JOIN language AS l ON f.language_id = l.language_id
GROUP BY f.title, l.name
ORDER BY monies DESC
-- LIMIT 5
