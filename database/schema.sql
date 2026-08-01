-- This extension is required for generating UUIDs   
create extension if not exists "pgcrypto"; 

create table if not exists service (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    is_active boolean default true,
    created_at timestamp with time zone default now()


);