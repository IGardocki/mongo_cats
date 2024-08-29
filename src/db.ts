import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'cat_database';

let client: MongoClient;

//set up migrations 

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  return client.db(dbName);
};

