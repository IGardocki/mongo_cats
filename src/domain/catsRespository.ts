import {Cat} from './cat';
import { MongoClient, WithId } from 'mongodb';
import { catClient } from './catClient';

const url = 'mongodb://localhost:27017';

// this will contain all business rules
// you never want to mix business rules with frameworks/express

export class CatsRepository {
    // add default value if user doesnt pass in client 
    // this can be used to mock for tests
    client: MongoClient;
    constructor(client: MongoClient = catClient){
        this.client = client;
    }

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

    public async getAllCats(): Promise<WithId<Cat>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            await this.client.connect(); 
            console.log('Connected to MongoDB'); 
            const db = this.client.db('cat_database'); 
            const collection = db.collection<Cat>('cats');  

            // need toArray to actually get a list of cats
            result = await collection.find({}).toArray();
            console.log(result);
            return result;

        } catch (error) { 
            console.error('Error:', error);
        } 
        finally { 
            await this.client.close(); 
            console.log('Disconnected from MongoDB'); 
        }
    }
}