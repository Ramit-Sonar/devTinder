-Never trust req.body always sanitize and validate each data
-use validator library to validate email, password, url etc 
-bcrypt for the password hashing 

-Validation failure → throw new Error()
-User already exists → return res.send()
-Successful signup → res.send()
-Unexpected error → catch → res.send()

-thought process - POST vs GET

-select() selects fields from the current query's documents;
-populate() fetches related documents through a reference.
-.populate("fieldName", "field1 field2 field3")


### Pagination

Pagination divides large data into smaller pages to improve performance.

- `/feed?page=1&limit=10` → Users 1–10 => .skip(0) & .limit(10)
- `/feed?page=2&limit=10` → Users 11–20
- `/feed?page=3&limit=10` → Users 21–30

**Formula:**
`skip = (page - 1) × limit`

- `page` → Page number
- `limit` → Number of users per page
- `skip` → Number of users to skip