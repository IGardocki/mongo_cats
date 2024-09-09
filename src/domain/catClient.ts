import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

// create a client
export const catClient = new MongoClient(url);