const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

async function searchByCpf(cpf) {
    const database = client.db('your_database_name'); // Replace with your database name
    const collection = database.collection('your_collection_name'); // Replace with your collection name

    const result = await collection.findOne({ cpf: cpf });
    return result;
}

async function searchByCnpj(cnpj) {
    const database = client.db('your_database_name'); // Replace with your database name
    const collection = database.collection('your_collection_name'); // Replace with your collection name

    const result = await collection.findOne({ cnpj: cnpj });
    return result;
}

module.exports = {
    connectToDatabase,
    searchByCpf,
    searchByCnpj,
};