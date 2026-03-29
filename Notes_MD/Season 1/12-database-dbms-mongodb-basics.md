# Node.js — Databases, DBMS and MongoDB Basics

## What is a Database

A database is an organized or structured collection of data.

Databases are used to store large amounts of information in a structured way so that it can be easily accessed, managed, and updated.

Examples of data stored in databases:

- User information
- Product data
- Orders
- Transactions
- Logs

---

# What is a Database Management System (DBMS)

A Database Management System (DBMS) is software that allows us to interact with a database.

The DBMS provides tools and functionality to perform operations such as:

- Reading data
- Writing data
- Updating data
- Deleting data

Examples of DBMS software:

- MySQL
- PostgreSQL
- MongoDB
- Oracle Database

---

# Difference Between Database and DBMS

Database and DBMS are two different concepts.

Database:

```
A storage system that holds structured data.
```

DBMS:

```
Software that allows users and applications to interact with the database.
```

In simple terms:

- Database stores the data
- DBMS manages and interacts with the data

---

# Types of Databases

Databases are generally categorized into two types:

1. SQL Databases
2. NoSQL Databases

---

# SQL Databases

SQL databases store data in a structured tabular format.

Data is organized into:

- Tables
- Rows
- Columns

Example SQL databases:

- MySQL
- PostgreSQL
- Microsoft SQL Server
- Oracle

---

# NoSQL Databases

NoSQL databases store data in flexible formats such as:

- Documents
- Key-value pairs
- Graphs
- Wide-column stores

Example NoSQL databases:

- MongoDB
- Cassandra
- Redis
- DynamoDB

---

# MongoDB

MongoDB is a **document-oriented NoSQL database**.

Instead of storing data in tables and rows, MongoDB stores data as **documents**.

Documents are stored inside **collections**.

---

# SQL vs MongoDB Terminology

The terminology used in SQL databases is different from MongoDB.

| SQL Concept | MongoDB Equivalent |
|-------------|-------------------|
| Table | Collection |
| Row | Document |
| Column | Field |

Example representation:

SQL:

```
Table → Users
Row → Individual user record
Column → Name, Age, Email
```

MongoDB:

```
Collection → Users
Document → Individual user record
Fields → name, age, email
```

---

# MongoDB Document Example

Example MongoDB document:

```json
{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}
```

Each document is stored in **JSON-like format (BSON internally)**.

---

# Joins and Data Normalization

In traditional SQL databases:

- Data is normalized
- Relationships are handled using joins

Example:

```
Users table
Orders table
Join between Users and Orders
```

In MongoDB:

- Data is usually stored in a denormalized form
- Documents may contain nested data
- Joins are often unnecessary

Example:

```
User document may contain embedded order data
```

This makes read operations faster for certain use cases.

---

# Key Takeaways

- A database is an organized collection of data
- A DBMS is software used to interact with a database
- SQL databases store data in tables
- NoSQL databases store data in flexible formats
- MongoDB is a document-oriented NoSQL database
- In MongoDB:
  - Table = Collection
  - Row = Document
  - Column = Field
- MongoDB typically avoids joins and heavy normalization
```