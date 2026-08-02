-- This extension is required for generating UUIDs   
--This lets the administrator control which service or vehicle appears first.
create extension if not exists pgcrypto;

create table services (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    is_active boolean not null default true,
    display_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table vehicles (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    image_url text,
    passenger_capacity integer,
    luggage_capacity text,
    vehicle_type text,
    is_available boolean not null default true,
    is_active boolean not null default true,
    display_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint vehicles_passenger_capacity_check
        check (passenger_capacity is null or passenger_capacity > 0)
);

create table bookings (
    id uuid primary key default gen_random_uuid(),
    booking_reference text not null unique,
    customer_name text not null,
    phone text not null,
    email text,
    service_id uuid references services(id) on delete set null,
    vehicle_id uuid references vehicles(id) on delete set null,
    pickup_location text not null,
    destination text not null,
    travel_date date not null,
    departure_time time,
    return_date date,
    passengers integer not null,
    message text,
    status text not null default 'pending',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint bookings_passengers_check
        check (passengers > 0),

    constraint bookings_status_check
        check (
            status in (
                'pending',
                'contacted',
                'confirmed',
                'completed',
                'cancelled'
            )
        ),

    constraint bookings_return_date_check
        check (
            return_date is null or return_date >= travel_date
        )
);








create table gallery (
    id uuid primary key default gen_random_uuid(),
    title text,
    description text,
    image_url text not null,
    is_active boolean not null default true,
    display_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint gallery_display_order_check
        check (display_order >= 0)
);

create table testimonials (
    id uuid primary key default gen_random_uuid(),
    customer_name text not null,
    customer_role text,
    message text not null,
    rating integer not null default 5,
    image_url text,
    is_active boolean not null default true,
    display_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint testimonials_rating_check
        check (rating between 1 and 5),

    constraint testimonials_display_order_check
        check (display_order >= 0)
);

--Settings table has one row settings represents the business 
--itself, not a collection like vehicles or bookings.
create table settings (
    id uuid primary key default gen_random_uuid(),
    business_name text not null,
    slogan text,
    description text,
    primary_phone text,
    secondary_phone text,
    whatsapp_number text,
    email text,
    address text,
    map_url text,
    logo_url text,
    hero_image_url text,
    facebook_url text,
    instagram_url text,
    tiktok_url text,
    business_hours text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table admins (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null unique,
    password_hash text not null,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);