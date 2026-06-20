// Import MongoClient from the MongoDB library  
const { MongoClient } = require('mongodb');    
require('dotenv').config();


async function main() {  
    // MongoDB credentials  
    // const user = 'root';  
    // const password = 'MjQwOTgtcnNhbm5h'; // Replace with your password  
    // const host = 'mongo';  

    // MongoDB connection URL  
    // const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;  
    const user = process.env.MONGO_USERNAME;
    const password =  process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST; 
    
    console.log("Credentials:", user, password, host);
    const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;
    // Create a MongoDB client instance  
    const client = new MongoClient(url);  

    try {  
        await client.connect();  
        console.log("Connected to MongoDB server");  

        // Access the 'training' database and 'javascript' collection  
        const db = client.db('training');  
        const collection = db.collection('javascript');  

        // Insert a document  
        const doc = { lab: "Accessing MongoDB using Node.js", Subject: "No SQL Databases" };  
        const result = await collection.insertOne(doc);  
        console.log(`Inserted document ID: ${result.insertedId}`);  

        // Retrieve and log all documents  
        const documents = await collection.find({}).toArray();  
        console.log("Documents in collection:", documents);  
    } catch (err) {  
        console.error(err); // Handle errors  
    } finally {  
        await client.close();  
        console.log("Connection closed");  
    }  
}  

// Run the script  
main();  
