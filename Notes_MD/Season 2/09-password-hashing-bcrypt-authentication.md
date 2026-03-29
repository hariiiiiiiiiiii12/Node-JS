# Node.js — Password Security, bcrypt and Authentication APIs

## Never Trust req.body

Incoming request data should never be trusted.

Example:

```
req.body
```

The client can send anything inside the request body, including:

- malicious data
- invalid values
- unexpected fields

Therefore:

```
Always validate incoming request data before processing it.
```

---

# Problem with Storing Passwords in Plain Text

Example stored password:

```
password: "mypassword123"
```

Problems:

- If the database is compromised, all passwords are exposed
- Anyone with database access can see user passwords
- Major security risk

Correct approach:

```
Passwords must be stored as hashed values.
```

---

# Correct Signup Flow

Proper sequence for handling signup:

```
1 Validate request data
2 Hash the password
3 Store the user in the database
```

Important rule:

```
Never trust req.body
```

---

# Separate Validation Logic

Validation logic should not be written directly inside the API route.

Instead, create a separate helper module.

Example structure:

```
utils/
   validation.js
```

This keeps the code clean and reusable.

---

# Hashing Passwords using bcrypt

To hash passwords, we use the npm package:

```
bcrypt
```

Install it:

```bash
npm install bcrypt
```

Import it:

```javascript
const bcrypt = require("bcrypt");
```

---

# What is Salt

Salt is a random string added to the password before hashing.

Purpose:

```
Prevents attackers from using precomputed hash tables
```

Example:

```
password + salt → hash
```

Each password gets a unique hash.

---

# Hashing Password

Example:

```javascript
const passwordHash = await bcrypt.hash(password, 10);
```

Explanation:

```
password → plain text password
10 → number of salt rounds
```

Important:

```
bcrypt.hash() returns a promise
```

---

# Storing the Hashed Password

After hashing the password, store the hash in the database.

Example:

```javascript
const user = new User({
  firstName,
  emailId,
  password: passwordHash
});

await user.save();
```

Important:

```
Never store plain text passwords.
```

---

# Password Hash Cannot Be Decrypted

Once a password is hashed:

```
It cannot be decrypted.
```

So how do we verify passwords?

Answer:

```
Use bcrypt.compare()
```

---

# Login API

During login, two checks must be performed.

Step 1:

```
Check if a user exists with the given email
```

Step 2:

```
Verify the password
```

Example login logic:

```javascript
const user = await User.findOne({ emailId });

if (!user) {
  throw new Error("Invalid credentials");
}
```

---

# Verifying Password using bcrypt

Example:

```javascript
const isPasswordValid = await bcrypt.compare(
  enteredPassword,
  user.password
);
```

Explanation:

```
enteredPassword → plain text password from login
user.password → hashed password stored in database
```

Return value:

```
true  → password correct
false → password incorrect
```

---

# Important Security Rule

Never reveal whether:

```
Email exists
Password is incorrect
```

Bad responses:

```
Email not found
Password incorrect
```

Reason:

```
Attackers can detect valid email IDs.
```

Correct response:

```
Invalid credentials
```

Example:

```javascript
if (!user || !isPasswordValid) {
  throw new Error("Invalid credentials");
}
```

---

# Example Login Flow

```
User enters email and password
Server finds user by email
bcrypt.compare() checks password
If valid → login success
If invalid → return "Invalid credentials"
```

---

# Key Takeaways

- Never trust request body data
- Always validate incoming request data
- Passwords should never be stored in plain text
- bcrypt is used to hash passwords
- Salt adds randomness to password hashes
- bcrypt.hash() returns a promise
- Password hashes cannot be decrypted
- bcrypt.compare() validates passwords
- Login responses should not reveal whether email or password is incorrect
```