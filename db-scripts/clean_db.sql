-- Удаление всех таблиц, представлений, индексов, и других объектов в схеме public
DO $$ DECLARE
    r RECORD;
BEGIN
    -- Удаляем все объекты (таблицы, индексы, представления, функции и т.д.) из схемы public
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
    END LOOP;
    
    -- Также удаляем все представления, последовательности, индексы и функции
    FOR r IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS public.' || r.viewname || ' CASCADE';
    END LOOP;

    FOR r IN (SELECT relname FROM pg_class WHERE relkind = 'S' AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS public.' || r.relname || ' CASCADE';
    END LOOP;

    FOR r IN (SELECT proname FROM pg_proc WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS public.' || r.proname || ' CASCADE';
    END LOOP;
END $$;

-- Пересоздаем схему public
CREATE SCHEMA public;
