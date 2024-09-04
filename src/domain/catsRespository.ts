import {Cat} from './cat';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

// this will contain all business rules
// you never want to mix business rules with frameworks/express

// todo: extract out mongo. repo should just accept a client as an argument
// todo migrations: https://medium.com/@tobie.tsuzuki/getting-started-with-node-js-express-and-knex-5640f595df98
// https://knexjs.org/guide/migrations.html

export class CatsRepository {
    client: MongoClient;
    constructor(client: MongoClient){
        this.client = client;
    }

    // public async insertCat(client: MongoClient, cat: Cat){
    public async insertCat(cat: Cat): Promise<void>{
        try { 
            // Connect to MongoDB 
            await this.client.connect(); 
            console.log('Connected to MongoDB'); 
            const db = this.client.db('cat_database'); 
            const collection = db.collection<Cat>('cats');  

            // Insert the cat into the collection 
            const result = await collection.insertOne(cat); 
            console.log('Cat saved with id:', result.insertedId); 
        } catch (error) { 
            console.error('Error:', error); 
        } 
        finally { 
            // Close the connection 
            await this.client.close(); 
            console.log('Disconnected from MongoDB'); 
        }
    }

    // public async getAllCats(){
    //     try { 
    //         // Connect to MongoDB 
    //         await this.client.connect(); 
    //         console.log('Connected to MongoDB'); 
    //         const db = this.client.db('cat_database'); 
    //         const collection = db.collection<Cat>('cats');  

    //         // Insert the cat into the collection 
    //         const result = await collection.insertOne(cat); 
    //         console.log('Cat saved with id:', result.insertedId); 
    //     } catch (error) { 
    //         console.error('Error:', error); 
    //     } 
    //     finally { 
    //         // Close the connection 
    //         await this.client.close(); 
    //         console.log('Disconnected from MongoDB'); 
    //     }
    // }
}