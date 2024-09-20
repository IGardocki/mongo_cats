import {Cat} from './cat';
import { Collection, MongoClient, WithId } from 'mongodb';
import { catClient } from './catClient';
import { catValidator } from './catValidator';

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

    /** Sets up db connection */
    async setUpCatDb(): Promise<Collection<Cat>>{
    await this.client.connect(); 
    console.log('Connected to MongoDB'); 
    const db = this.client.db('cat_database'); 
    const collection = db.collection<Cat>('cats'); 
    return collection; 
}

    public async insertCat(cat: Cat): Promise<void>{
        try { 
            // validate the cat
            let valResp = catValidator(cat);
            
            if(!valResp.valid){
                throw new Error(valResp.errorsAsString());
            }
            // Connect to MongoDB 
            const collection = await this.setUpCatDb()

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

    //get all cats
    public async getAllCats(): Promise<WithId<Cat>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            const collection = await this.setUpCatDb();

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

    // query based off of one field
    public async getCatsByName(catName:string): Promise<WithId<Cat>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            const collection = await this.setUpCatDb();

            // need toArray to actually get a list of cats
            result = await collection.find({name: catName}).toArray();
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

    public async getCatsByColor(catColor:string): Promise<WithId<Cat>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            const collection = await this.setUpCatDb();

            // need toArray to actually get a list of cats
            result = await collection.find({color: catColor}).toArray();
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