import express from 'express';
import { connectToDatabase } from './db';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('It\'s cat time!');
});

app.get('/cats', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('cats').find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching items');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
