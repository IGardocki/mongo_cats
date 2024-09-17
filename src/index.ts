import { MongoClient } from 'mongodb';
import { catClient } from './domain/catClient';
import { connectToDatabase } from './db';
import { Cat } from './domain/cat';
import {CatsRepository} from './domain/catsRespository';
import express from 'express';


const url = 'mongodb://localhost:27017';

// create a cat repo and pass in client
const catsRepository = new CatsRepository(catClient);

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('It\'s cat time!');
});

// get all
app.get('/cats', async (req, res) => {
  try {
    const allCats = await catsRepository.getAllCats();
    res.status(200).json(allCats);
  } catch (error) {
    res.status(500).send(`Error fetching items: ${error} error`);
  }
});

// query db based off of one field
app.get('/name/:name', async (req, res) => {
  try {
    const cats = await catsRepository.getCatsByName(req.params.name);
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).send(`Error fetching items: ${error} error`);
  }
});

// query db and look within array in db
app.get('/color/:color', async (req, res) => {
  try {
    const cats = await catsRepository.getCatsByColor(req.params.color);
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).send(`Error fetching items: ${error} error`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
