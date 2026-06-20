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
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST; 
    
    console.log("Credentials:", user, password, host);
    const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;
    // Create a MongoDB client instance  
    const client = new MongoClient(url);  

    try {  
        await client.connect();  
        console.log("Connected to MongoDB server");  

        // Access the 'training' database and 'mongodb_glossary' collection  
        const db = client.db('training');  
        const collection = db.collection('mongodb_glossary');  

        // Insert multiple documents  
        const docs = [  
            { database: "a database contains collections" },  
            { collection: "a collection stores the documents" },  
            { document: "a document contains the data in the form of key-value pairs." }  
        ];  
        const result = await collection.insertMany(docs);  
        console.log(`${result.insertedCount} documents inserted`);  

        // Retrieve and log all documents  
        const documents = await collection.find({}).toArray();  
        console.log("Documents in collection:");  
        documents.forEach(doc => console.log(doc));  
    } catch (err) {  
        console.error(err); // Handle errors  
    } finally {  
        await client.close();  
        console.log("Connection closed");  
    }  
}  

// Run the script  
main();  
