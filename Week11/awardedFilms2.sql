SELECT film_id, title, COUNT(film_id)
FROM vw_films_categories
WHERE type = 'award' AND store_id = 2
GROUP BY film_id, title
ORDER BY count DESC

