 SELECT cu.customer_id AS id,
    (cu.first_name::text || ' '::text) || cu.last_name::text AS full_name,
    cu.email,
    a.phone,
	a.address,
    city.city,
	a.district AS store_name,
	r.return_date,
    cu.store_id AS sid
   FROM customer cu
   	JOIN rental r ON cu.customer_id = r.customer_id
     JOIN address a ON cu.address_id = a.address_id
     JOIN city ON a.city_id = city.city_id
     JOIN country ON city.country_id = country.country_id
	 WHERE cu.customer_id = 148
	AND r.return_date IS NULL;