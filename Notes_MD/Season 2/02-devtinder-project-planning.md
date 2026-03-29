# DevTinder — Project Planning (Backend)

## Project Idea

DevTinder is a backend project inspired by Tinder but designed for developers.

The goal of the application is to allow developers to:

- Create profiles
- Discover other developers
- Send connection requests
- Accept or reject requests
- Build a network of developers

This project focuses on building the backend APIs using Node.js and Express.

---

# High Level Concept

The system consists of:

```
Client (Frontend)
        ↓
API Server (Node.js + Express)
        ↓
Database (MongoDB)
```

The backend server handles:

- authentication
- profile management
- connection requests
- feed generation
- database interactions

---

# Core Entities

The main entities in the system are:

```
User
Connection Request
Connections
```

---

# User Entity

A user represents a developer who signs up on the platform.

Typical user fields:

```
_id
firstName
lastName
email
password
age
gender
skills
about
photoUrl
```

Purpose:

- Store developer information
- Allow developers to discover each other
- Build professional networking connections

---

# Authentication

Authentication is required for most API routes.

Authentication flow:

```
User registers
User logs in
Server validates credentials
JWT token generated
Token stored in cookies
Authenticated requests use the token
```

Authentication responsibilities:

- Secure login
- Protect API routes
- Maintain user sessions

---

# Connection Request Entity

Connection requests represent the interaction between two users.

Example fields:

```
fromUserId
toUserId
status
createdAt
updatedAt
```

Status values may include:

```
interested
ignored
accepted
rejected
```

---

# Connection Request Flow

Typical flow:

```
User A sends request → User B
User B accepts request
Connection is created
```

Possible actions:

- Send request
- Accept request
- Reject request
- Ignore request

---

# Feed System

The feed shows developers that a user may want to connect with.

Feed generation rules:

- Exclude the current logged-in user
- Exclude users already connected
- Exclude users with pending requests
- Return developers who are not yet connected

---

# Backend API Modules

The backend application is divided into multiple modules.

Example modules:

```
Authentication APIs
Profile APIs
Connection APIs
Feed APIs
```

---

# Authentication APIs

Responsible for user authentication.

Example endpoints:

```
POST /signup
POST /login
POST /logout
```

Responsibilities:

- create new users
- validate login credentials
- issue authentication tokens

---

# Profile APIs

Responsible for managing user profile information.

Example endpoints:

```
GET /profile
PATCH /profile/edit
```

Responsibilities:

- fetch profile data
- update profile information

---

# Connection APIs

Responsible for sending and managing connection requests.

Example endpoints:

```
POST /request/send/:userId
POST /request/review/:status/:requestId
```

Responsibilities:

- send connection requests
- accept or reject requests

---

# Feed APIs

Responsible for fetching developer suggestions.

Example endpoint:

```
GET /feed
```

Responsibilities:

- show developers not yet connected
- filter out invalid results

---

# Database Design

The system typically contains two main collections.

```
Users
ConnectionRequests
```

---

# Users Collection

Stores developer information.

Example document:

```json
{
  "_id": "userId",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "skills": ["Node.js", "React"],
  "about": "Backend developer",
  "photoUrl": "profile-url"
}
```

---

# ConnectionRequests Collection

Stores relationship requests between users.

Example document:

```json
{
  "_id": "requestId",
  "fromUserId": "user1",
  "toUserId": "user2",
  "status": "interested"
}
```

---

# Backend Responsibilities

The backend system handles:

- user authentication
- validation
- connection request logic
- database operations
- API responses

---

# Security Considerations

Important security practices include:

- hashing passwords
- validating user input
- protecting routes using authentication
- preventing duplicate connection requests

---

# Technology Stack

Backend stack used in the project:

```
Node.js
Express.js
MongoDB
JWT Authentication
Cookies
```

---

# Key Takeaways

- DevTinder is a backend project for connecting developers
- The system manages users and connection requests
- Authentication is handled using tokens
- MongoDB stores user and request data
- APIs handle profile, authentication, feed, and connection logic
```