-- View: public.vw_stores

-- DROP VIEW public.vw_stores;

CREATE OR REPLACE VIEW public.vw_stores
 AS
 SELECT st.store_id,
    concat(sf.first_name, ' ', sf.last_name) AS mgr_name,
    sf.email,
    ad.phone,
    ad.address,
    ad.district AS store_name,
    ct.city,
    cn.country,
    ad.postal_code
   FROM store st
     JOIN address ad ON st.address_id = ad.address_id
     JOIN city ct ON ad.city_id = ct.city_id
     JOIN country cn ON ct.country_id = cn.country_id
     JOIN staff sf ON st.store_id = sf.store_id;

ALTER TABLE public.vw_stores
    OWNER TO postgres;

