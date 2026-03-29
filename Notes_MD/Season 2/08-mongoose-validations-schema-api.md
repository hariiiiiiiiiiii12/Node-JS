# Node.js — Mongoose Validations, Schema Rules and API Level Validation

## Need for Strict Validations

APIs such as POST and PATCH must have strict validation rules.

Without validations:

- invalid data may enter the database
- inconsistent data may be stored
- security risks may occur

Strict validation ensures that data is stored only when required conditions are satisfied.

---

# Optional Fields

If a schema does not mark a field as required, documents can be inserted without that field.

Example:

If `lastName` is not required, a user document can still be inserted without it.

---

# Unique Email Validation

One common validation rule is ensuring that the email ID is unique.

Example schema field:

```javascript
emailId: {
  type: String,
  unique: true
}
```

This ensures that multiple users cannot register using the same email ID.

---

# Controlling How Data is Stored

Even if users send data in a certain format, the database can store it differently.

Example:

```
User sends: AKSHAY@MAIL.COM
Database stores: akshay@mail.com
```

Schema configuration:

```javascript
emailId: {
  type: String,
  lowercase: true
}
```

This automatically converts email IDs to lowercase before storing them.

---

# Removing Extra Spaces

Users may send emails with extra spaces.

Example:

```
"user@mail.com"
"user@mail.com "
```

MongoDB treats them as different values.

To prevent this, trimming can be used.

Example:

```javascript
emailId: {
  type: String,
  trim: true
}
```

This removes leading and trailing spaces.

---

# Enum Validation for Fields

Certain fields should only accept specific values.

Example: Gender

Allowed values:

```
male
female
other
```

Example schema validation:

```javascript
gender: {
  type: String,
  validate(value) {
    if (!["male", "female", "other"].includes(value)) {
      throw new Error("Invalid gender value");
    }
  }
}
```

---

# Schema Validation Limitation

Schema validation works when a new document is created.

Example:

```
new User().save()
```

However, validations may not run automatically during update operations.

---

# Enabling Validation During Updates

To enforce schema validation during updates, enable:

```
runValidators: true
```

Example:

```javascript
User.findByIdAndUpdate(
  userId,
  updateData,
  { runValidators: true }
);
```

This ensures that schema validations are applied during updates.

---

# Automatic Timestamps

Mongoose can automatically store document creation and update times.

Schema option:

```javascript
timestamps: true
```

Example:

```javascript
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    emailId: String
  },
  { timestamps: true }
);
```

MongoDB will automatically add:

```
createdAt
updatedAt
```

---

# API Level Validation

Some validations cannot be handled at schema level.

Example:

A user should not be allowed to change their email ID after registration.

This must be handled in the API logic.

---

# Restricting Fields in Update API

Users should only be allowed to update specific fields.

Example allowed fields:

```
firstName
lastName
age
skills
about
```

Example validation logic:

```javascript
const allowedUpdates = [
  "firstName",
  "lastName",
  "age",
  "skills",
  "about"
];

const isUpdateAllowed = Object.keys(req.body)
  .every(field => allowedUpdates.includes(field));

if (!isUpdateAllowed) {
  throw new Error("Invalid update fields");
}
```

This prevents users from sending unwanted fields.

Example blocked field:

```
xyz
```

---

# Importance of try-catch

All database logic should be placed inside a `try-catch` block.

Reason:

Without it, Express might send multiple responses for the same request.

Example problem:

```
Response sent inside route
Error thrown afterwards
Catch block sends another response
```

This causes server errors.

Example correct structure:

```javascript
try {
  // database logic
  res.send("Success");
} catch (err) {
  res.status(400).send("Error occurred");
}
```

---

# Email Validation Using External Library

Basic schema validation cannot fully validate email formats.

An external library such as `validator` can be used.

Install:

```bash
npm install validator
```

Import:

```javascript
const validator = require("validator");
```

Example schema validation:

```javascript
emailId: {
  type: String,
  validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error("Invalid email address");
    }
  }
}
```

This ensures that only valid email formats are stored.

---

# Types of Validation

Two types of validation exist:

### Schema Level Validation

Defined directly inside the schema.

Examples:

- required fields
- email format
- enum values
- string trimming

---

### API Level Validation

Defined inside route logic.

Examples:

- preventing email changes
- restricting allowed update fields
- custom business rules

---

# Key Takeaways

- POST and PATCH APIs require strict validations
- Unique email IDs prevent duplicate users
- Schema can automatically convert text to lowercase
- Trim removes extra spaces from input
- Enum validation restricts allowed values
- runValidators enables validation during updates
- timestamps automatically add createdAt and updatedAt
- API level validation enforces business logic
- try-catch prevents multiple responses
- validator library helps validate email formats