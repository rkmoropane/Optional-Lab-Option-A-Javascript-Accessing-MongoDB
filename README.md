# 🟨 Accessing MongoDB using JavaScript (Optional Lab)

## 📖 Overview

This optional lab demonstrates how to connect to MongoDB using Node.js while following best practices by using environment variables (`.env`) to store sensitive credentials.

You will learn how to:
- Connect to MongoDB using JavaScript
- Use environment variables securely
- Perform basic CRUD operations
- Query and display data from MongoDB

---

# ⏱️ Estimated Time

**30 minutes**

---

# 🎯 Objectives

After completing this lab, you will be able to:

- Connect to MongoDB using Node.js
- Use the MongoDB driver (`mongodb`)
- Secure credentials using `.env`
- Insert and retrieve documents
- Work with async MongoDB operations
- Close database connections properly

---

# 📦 Install Dependencies

Install MongoDB driver:

"
npm install mongodb
"

Install dotenv package:

"
npm install dotenv
"

---

# 🔐 Environment Variables (.env)

Create a file called:

"
.env
"

Add the following:

"
MONGO_USER=root
MONGO_PASSWORD=your_password_here
MONGO_HOST=mongo
MONGO_DB=training
"

> Never hardcode credentials in your JavaScript files.

---

# 🧪 Exercise 1 — Connect to MongoDB

Create a file:

"
mongo_connect.js
"

---

## JavaScript Code (Using .env)

"
require('dotenv').config();
const { MongoClient } = require('mongodb');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;

async function main() {
    const client = new MongoClient(url);

    try {
        console.log('Connecting to MongoDB...');

        await client.connect();

        console.log('Connected successfully');

        const dbList = await client.db().admin().listDatabases();

        console.log('Databases:');

        dbList.databases.forEach(db => {
            console.log(db.name);
        });

    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
"

---

## Run the file:

"
node mongo_connect.js
"

---

# 🧪 Exercise 2 — Working with Documents

Create a file:

"
mongo_query.js
"

---

## JavaScript Code (CRUD with .env)

"
require('dotenv').config();
const { MongoClient } = require('mongodb');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB;

const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('javascript');

        console.log('Inserting document...');

        await collection.insertOne({
            lab: 'Accessing MongoDB using JavaScript',
            subject: 'NoSQL Databases'
        });

        console.log('Document inserted');

        console.log('Fetching documents...');

        const docs = await collection.find().toArray();

        docs.forEach(doc => console.log(doc));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
"

---

## Run the file:

"
node mongo_query.js
"

---

# 🏋️ Practice Exercise

## Task

Build a Node.js program that:

- Connects to MongoDB using `.env`
- Uses database: training
- Uses collection: mongodb_glossary
- Inserts the following documents:

"
{ database: "a database contains collections" }
{ collection: "a collection stores documents" }
{ document: "a document contains key-value pairs" }
"

- Retrieves all documents
- Prints them in the console
- Closes the connection properly

---

# 🧪 Practice Solution

"
require('dotenv').config();
const { MongoClient } = require('mongodb');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB;

const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('mongodb_glossary');

        console.log('Inserting documents...');

        await collection.insertMany([
            { database: "a database contains collections" },
            { collection: "a collection stores documents" },
            { document: "a document contains key-value pairs" }
        ]);

        console.log('Fetching documents...');

        const docs = await collection.find().toArray();

        docs.forEach(doc => console.log(doc));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
"

---

# 📌 Key Takeaways

- `.env` is used to securely store sensitive credentials
- `dotenv` loads environment variables into Node.js
- MongoDB connections should never hardcode passwords
- `MongoClient` is used for all database operations
- Always close connections using `client.close()`
- Async/await is required for MongoDB operations in Node.js

---

# 🔐 Best Practice Reminder

✔ Use `.env` for credentials  
✔ Never commit passwords to GitHub  
✔ Use `process.env` in Node.js  

---

# 👨‍💻 Author

IBM Corporation
---