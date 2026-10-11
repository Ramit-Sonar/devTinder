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