SELECT * FROM language

SELECT l.name, COUNT(film_id) FROM film AS f
INNER JOIN language AS l ON f.language_id = l.language_id
GROUP BY l.name

SELECT COUNT(film_id) FROM film

SELECT random_between(1, 1000)

SELECT random_between(1,1000) FROM generate_series(1,30);

CALL public.redistribute_languages(6,120)