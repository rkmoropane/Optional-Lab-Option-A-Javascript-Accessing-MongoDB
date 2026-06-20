// Importing the MongoClient class from the 'mongodb' package  
require('dotenv').config();
const { MongoClient } = require('mongodb');


// Defining the main asynchronous function  
async function main() {  
    // MongoDB credentials (Ensure the password is correctly copied from Exercise 2)  
    // const user = 'root';  
    // const password = 'MjQwOTgtcnNhbm5h'; // Replace with your password from Exercise 2  
    // const host = 'mongo';  

    // Constructing the MongoDB connection URL  
    // const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;  
    const user = process.env.MONGO_USERNAME;
    const password = git addprocess.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST; 
    
    console.log("Credentials:", user, password, host);
    const url = `mongodb://${user}:${password}@${host}:27017/?authSource=admin`;
    // Creating a new MongoClient instance  
    const client = new MongoClient(url);  

    try {  
        // Connecting to the MongoDB server  
        await client.connect();  
        console.log("Connected to MongoDB server");  

        // Fetching and listing available databases  
        const databases = await client.db().admin().listDatabases();  
        console.log("Databases:");  
        databases.databases.forEach(db => console.log(` - ${db.name}`));  
    } catch (err) {  
        // Handling and logging errors  
        console.error(err);  
    } finally {  
        // Closing the database connection  
        await client.close();  
        console.log("Connection closed");  
    }  
}  

// Invoking the main function to execute the script  
main();  
