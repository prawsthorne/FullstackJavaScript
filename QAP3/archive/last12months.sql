SELECT concat(c.first_name, ' ', c.last_name) AS full_name
	,c.email
	,f.title
	,r.rental_date
FROM customer AS c
INNER JOIN rental AS r ON c.customer_id = r.customer_id
INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id
INNER JOIN film AS f ON i.film_id = f.film_id
WHERE c.customer_id = 148 AND
r.rental_date >  CURRENT_DATE - INTERVAL '12 months'