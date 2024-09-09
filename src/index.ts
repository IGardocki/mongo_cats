import { MongoClient } from 'mongodb';
import { catClient } from './domain/catClient';
import { connectToDatabase } from './db';
import { Cat } from './domain/cat';
import {CatsRepository} from './domain/catsRespository';

const url = 'mongodb://localhost:27017';

// create a client
// const catClient = new MongoClient(url);

// create a cat repo and pass in client
const catsRepository = new CatsRepository(catClient);

catsRepository.insertCat(new Cat('Mimi', 13));
// old code
// import express from 'express';
// import { connectToDatabase } from './db';

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('It\'s cat time!');
// });

// app.get('/cats', async (req, res) => {
//   try {
//     const db = await connectToDatabase();
//     const items = await db.collection('cats').find().toArray();
//     res.json(items);
//   } catch (error) {
//     res.status(500).send(`Error fetching items: ${error} error`);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
