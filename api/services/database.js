const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URL);

const db = client.db(process.env.DB_NAME); 

module.exports = {
	db: db,
	client: client
};
