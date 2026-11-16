# Julie's Transportation Project Structure

This document is the starting point for understanding the whole Julie's Transportation project. It describes what exists today, where each responsibility belongs, how a request moves through the application, and which files a developer or coding agent should read before making changes.

## 1. Project Purpose

Julie's Transportation is a transportation booking website with:

- Public-facing HTML pages for the business website.
- An admin-facing HTML interface for managing bookings, vehicles, gallery content, and authentication.
- A Node.js and Express backend API.
- Supabase as the database and server-side data access layer.
- JWT-based admin authentication with bcrypt password hashing.

The project uses CommonJS modules (`require` and `module.exports`) and JavaScript. The package entrypoint is `src/app.js`.

## 2. Top-Level Structure

```text
Julies_Transportation/
|-- admin/                 Admin dashboard pages
|-- database/              Database schema and SQL definitions
|-- public/                Public website pages and browser JavaScript
|-- scripts/               One-off maintenance/setup scripts
|-- src/                   Express backend application
|-- .env                   Local secrets and configuration; never commit secrets
|-- .env.example           Example environment variable names
|-- package.json            npm metadata, dependencies, and commands
|-- package-lock.json       Locked npm dependency versions
|-- Architecture.md        Existing notes about the application flow
|-- README.md               Project overview; currently minimal
|-- Authentication         Authentication notes
|-- Databases              Database notes
|-- Questions              Open project questions
|-- Requirements            Requirements notes
|-- Roadmap.t               Roadmap notes
|-- SQL                     Additional SQL notes/scripts
`-- Supabase.txt            Supabase-related notes
```

The folders and files outside `src`, `public`, `admin`, and `database` are project documentation or planning material. They may contain useful context, but the running application is controlled primarily by `src/app.js`, the files it imports, and the database schema.

## 3. Backend (`src/`)

### `src/app.js`

This is the backend entrypoint. It:

1. Loads environment variables with `dotenv`.
2. Loads the environment configuration module.
3. Creates the Express application.
4. Serves the `public/` directory as static files.
5. Enables JSON and URL-encoded request bodies.
6. Registers the request logger.
7. Mounts page, API, and test routes.
8. Registers the error and not-found handlers.
9. Starts the server using the configured port.

The API resources are mounted under `/api`. Page routes use `/`, and test routes use `/test`.

### `src/config/`

- `appConfig.js` - Central application configuration, including the port, Supabase settings, and JWT settings.
- `env.js` - Environment-variable validation or loading used during startup.
- `supabase.js` - Creates and exports the server-side Supabase client. It disables persistent browser sessions because this client runs on the server.

Do not put passwords, JWT secrets, or Supabase keys directly in source files. Local values belong in `.env`; `.env.example` should contain names and safe placeholder values only.

### `src/routes/`

Routes define HTTP paths and decide which middleware and controller handle each request. They should remain thin and should not contain database queries.

- `pageRoutes.js` - Public page or content routes.
- `vehicleRoutes.js` - Vehicle API endpoints.
- `serviceRoutes.js` - Transportation service API endpoints.
- `bookingRoutes.js` - Booking API endpoints.
- `settingsRoutes.js` - Business settings API endpoints.
- `testimonialRoutes.js` - Testimonial API endpoints.
- `galleryRoutes.js` - Gallery API endpoints.
- `authRoutes.js` - Login and authentication endpoints.
- `testRoutes.js` - Development/test endpoints mounted under `/test`.

The normal CRUD route shape is:

```text
GET    /api/<resource>       Get active records
GET    /api/<resource>/:id   Get one record
POST   /api/<resource>       Create a record
PATCH  /api/<resource>/:id   Update a record
DELETE /api/<resource>/:id   Deactivate/remove a record
```

The exact middleware attached to each endpoint is defined in its route file. Read that file before changing authentication, validation, or parameter behavior.

### `src/controllers/`

Controllers translate HTTP requests into service calls and translate service results into HTTP responses. They should not contain direct Supabase queries or business rules.

- `pageController.js` - Handles page-related requests.
- `vehicleController.js` - Handles vehicle requests.
- `serviceController.js` - Handles service requests.
- `bookingController.js` - Handles booking requests.
- `settingsController.js` - Handles settings requests.
- `testimonialController.js` - Handles testimonial requests.
- `galleryController.js` - Handles gallery requests.
- `authController.js` - Handles login/authentication requests.
- `testController.js` - Handles test endpoints.

Controllers use `asyncHandler` so rejected asynchronous service calls reach the central error handler. Successful results normally go through `successResponse`.

Typical controller flow:

```javascript
const item = await resourceService.getResource(req.params.id);
return successResponse(res, 200, 'Resource retrieved successfully.', item);
```

### `src/services/`

Services own database access and resource-specific business logic. They use the Supabase client from `src/config/supabase.js` and throw `AppError` for expected application errors such as a missing record.

- `pageService.js` - Page/content data access.
- `vehicleService.js` - Vehicle data access.
- `servicesService.js` - Service data access. The filename is plural because the resource is called `services`.
- `bookingService.js` - Booking data access and booking logic.
- `settingsService.js` - Business settings data access.
- `testimonialService.js` - Testimonial data access.
- `galleryService.js` - Gallery data access.
- `authService.js` - Admin lookup, password verification, and token creation.

Resource services generally follow this order:

```text
imports
getAll / getItems
getById / getItem
create
update
delete or deactivate
module.exports
```

Public listing methods commonly filter to active records and order by `display_order`. Several delete operations are soft deletes: they set `is_active` to `false` instead of immediately removing the database row.

### `src/middleware/`

Middleware runs between the route and controller or handles requests globally.

- `authenticate.js` - Reads a Bearer JWT, verifies it, and attaches the decoded user to `req.user`.
- `authorize.js` - Middleware factory that checks whether `req.user.role` is allowed.
- `logger.js` - Logs incoming requests.
- `validateUUID.js` - Validates route UUID parameters.
- `validateLogin.js` - Validates login input.
- `validateBooking.js` - Validates booking input.
- `validateGallery.js` - Validates gallery create/update input.
- `validateService.js` - Validates service input.
- `validateSettings.js` - Validates settings input.
- `validateTestimonial.js` - Validates testimonial input.
- `validateVehicle.js` - Validates vehicle input.
- `errorHandler.js` - Converts thrown errors into HTTP error responses.
- `notFoundHandler.js` - Handles unmatched routes.

Validation belongs in middleware so controllers remain focused on orchestration. Authentication and authorization should be applied in route definitions, not hidden inside services.

### `src/utils/`

- `apiResponse.js` - Shared success/error response formatting.
- `AppError.js` - Application error class carrying an HTTP status and message.
- `asyncHandler.js` - Wraps async Express handlers and forwards rejected promises.
- `generateBookingReference.js` - Generates booking reference values.

Use these helpers instead of creating a second response or error format in an individual feature.

## 4. Database (`database/schema.sql`)

The database is PostgreSQL through Supabase. UUID primary keys are generated with the `pgcrypto` extension.

### Tables

- `services` - Transportation services offered by the business. Includes active state and display order.
- `vehicles` - Fleet vehicles, passenger/luggage capacity, vehicle type, availability, active state, and display order.
- `bookings` - Customer booking requests. References `services` and `vehicles`; stores travel details and a controlled booking status.
- `gallery` - Gallery images with title, description, active state, and display order.
- `testimonials` - Customer testimonials with rating, optional image, active state, and display order.
- `settings` - Business identity and contact details. This represents the business configuration rather than a collection of repeated content.
- `admins` - Admin users with a bcrypt password hash, email, active state, and timestamps.

Important database rules include:

- Booking passengers must be greater than zero.
- A return date cannot be before the travel date.
- Booking status is one of `pending`, `contacted`, `confirmed`, `completed`, or `cancelled`.
- Vehicle passenger capacity, when provided, must be positive.
- Testimonial ratings must be between 1 and 5.
- Display order values must not be negative where constrained.
- Deleting a referenced service or vehicle sets the related booking foreign key to `NULL`.

When changing data fields, update the relevant service, validator, frontend form, and `database/schema.sql` together.

## 5. Public Website (`public/`)

These are static pages served by Express from the project's `public/` directory.

- `index.html` - Main/home page.
- `about.html` - Business/about page.
- `services.html` - Services page.
- `fleet.html` - Fleet listing page.
- `vehicle.html` - Individual vehicle page.
- `booking.html` - Customer booking form/page.
- `contact.html` - Contact page.

### Public CSS

- `css/variables.css` - Shared design tokens and CSS variables.
- `css/global.css` - Base page and global styles.
- `css/components.css` - Reusable component styles.
- `css/responsive.css` - Responsive layout rules.

### Public JavaScript

- `js/main.js` - Shared browser behavior.
- `js/booking.js` - Booking form behavior and API interaction.
- `js/fleet.js` - Fleet/vehicle loading and display behavior.
- `js/gallery.js` - Gallery loading and display behavior.

The browser should call backend API routes rather than accessing Supabase directly. This keeps database credentials and business rules on the server.

## 6. Admin Interface (`admin/`)

- `login.html` - Admin login page.
- `dashboard.html` - Admin overview/dashboard.
- `bookings.html` - Booking management page.
- `vehicles.html` - Vehicle management page.
- `gallery.html` - Gallery management page.

These pages are currently separate static HTML files. Their JavaScript and authentication behavior should be checked in the page source before adding a new admin feature, because the admin interface is not organized into a separate frontend framework directory.

## 7. Request Lifecycle

For a normal API request, the intended flow is:

```text
Browser or admin page
        |
        v
Express route
        |
        v
Validation / UUID / authentication middleware
        |
        v
Controller
        |
        v
Service
        |
        v
Supabase database
        |
        v
Service result or AppError
        |
        v
Controller response or central error handler
        |
        v
JSON response to browser
```

For a new resource, the usual implementation order is:

1. Add or update the table and constraints in `database/schema.sql`.
2. Add a service that owns Supabase queries.
3. Add validators for create and update input.
4. Add a controller using `asyncHandler` and `successResponse`.
5. Add routes with the correct middleware.
6. Mount the route module in `src/app.js`.
7. Connect the public or admin page to the API.
8. Test success, validation failure, missing record, unauthorized access, and database error behavior.

## 8. Authentication Model

The authentication design uses:

- `bcrypt` to compare a submitted password with the stored `admins.password_hash`.
- `jsonwebtoken` to create and verify login tokens.
- The `Authorization: Bearer <token>` request header for protected requests.
- `authenticate` to verify the token and attach its payload to `req.user`.
- `authorize('admin')` or another role configuration when role-based access is required.

Never use `jwt.decode()` as authentication; token signatures must be verified with `jwt.verify()`.

When changing authentication, inspect `authRoutes.js`, `authController.js`, `authService.js`, `authenticate.js`, and `authorize.js` together. Authentication changes affect every protected admin operation.

## 9. Running the Project

Install dependencies:

```bash
npm install
```

Run in development mode with nodemon:

```bash
npm run dev
```

Run normally:

```bash
npm start
```

The server reads its port and external service credentials from environment configuration. Before starting the application, compare `.env` with `.env.example` and ensure the Supabase URL, Supabase server key, and JWT secret are configured.

There is currently no real automated test command configured. `npm test` only prints the default "no test specified" message, so endpoint checks or a test suite should be added before relying on automated verification.

## 10. Change Guidelines for Developers and Coding Agents

- Read the owning route, controller, service, validator, and database table before editing a feature.
- Keep route files focused on paths and middleware.
- Keep controllers focused on request/response orchestration.
- Keep Supabase queries and business rules in services.
- Reuse `AppError`, `asyncHandler`, and `successResponse`.
- Preserve the existing response format unless an API contract is intentionally being changed.
- Validate IDs and request bodies at the route boundary.
- Treat `is_active` and `display_order` as part of the content-management behavior.
- Update both create and update validators when a field changes.
- Do not expose `.env`, Supabase secrets, password hashes, or JWT secrets to browser code.
- When adding an endpoint, mount its route in `src/app.js` and verify the final URL prefix.
- Check both public and admin pages when changing shared data such as vehicles, services, gallery items, or settings.
- Avoid changing unrelated planning notes or generated dependency files unless the task requires it.

## 11. Current Implementation Notes

- The project contains planning/documentation files with names such as `Authentication`, `Databases`, `Requirements`, and `Questions`; inspect them for project decisions that are not yet represented in code.
- The existing architecture notes describe a consistent CRUD ordering for controllers and services. New modules should follow that convention.
- The backend starts the server directly in `src/app.js` rather than exporting the Express app for a test runner.
- Before relying on authentication behavior, verify the route middleware composition and error paths in the current implementation.
- The filename `servicesService.js` and the local variable spelling in `app.js` reflect existing code, so avoid broad renames unless the task specifically calls for one.

## 12. Fast Orientation Checklist

When first entering the project, read these files in order:

1. `package.json` for scripts and dependencies.
2. `src/app.js` for startup and route mounting.
3. `src/config/appConfig.js` and `.env.example` for configuration names.
4. `database/schema.sql` for the data model.
5. The relevant route, controller, service, and validator as one feature group.
6. The matching page in `public/` or `admin/`.
7. `Architecture.md` and the planning files for intended behavior and open questions.

This sequence reveals both the intended design and the implementation that is actually running.