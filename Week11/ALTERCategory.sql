CREATE TYPE public.category_type AS ENUM
    ('award', 'genre');

ALTER TYPE public.category_type
    OWNER TO postgres;

ALTER TABLE public.category
    ADD COLUMN type category_type;

UPDATE public.category
	SET type='award'
	WHERE name = 'Golden Globe';

ALTER TABLE public.category
    ALTER COLUMN type SET NOT NULL;

