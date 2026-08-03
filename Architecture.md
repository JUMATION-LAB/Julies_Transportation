Browser                            Browser

↓                                     ↓ 

Express Route                      Middleware

↓                                    ↓

Controller                        Route

↓                                    ↓

Service                          Controller

↓                                    ↓

Database                         Service

↓                                    ↓

Controller                           Database

↓                                    ↓

Response                           Controller
                                      ↓

                                     Browser   




Professional CRUD Flow      Every controller will always appear in this order:
GET /api/vehicles                   Imports
↓                                       ↓
Route                               GET ALL
↓                                       ↓
Controller                          GET ONE
↓                                      ↓
Service                             CREATE
↓                                       ↓
Supabase                            UPDATE
↓                                      ↓
JSON                                DELETE
                                       ↓
                                   module.exports




Every service will also follow one order:
Imports
↓
getAll
↓
getById
↓
create
↓
update
↓
remove
↓
module.exports







npm install bcrypt jsonwebtoken
bcrypt hashes and compares passwords.

jsonwebtoken creates and verifies login tokens. Its verify() method checks the token signature and expiration; decode() alone is not secure for authentication.




