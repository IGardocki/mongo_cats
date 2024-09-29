import {CatShelter} from './catShelter';
import { Collection, MongoClient, WithId } from 'mongodb';
import { catClient } from './catClient';
import { catShelterValidator } from './catShelterValidator';

const url = 'mongodb://localhost:27017';

// this will contain all business rules
// you never want to mix business rules with frameworks/express

export class CatShelterRepository {
    // add default value if user doesnt pass in client 
    // this can be used to mock for tests
    client: MongoClient;
    constructor(client: MongoClient = catClient){
        this.client = client;     
    }

    /** Sets up db connection */
    async setUpCatShelterDb(): Promise<Collection<CatShelter>>{
    await this.client.connect(); 
    console.log('Connected to MongoDB'); 
    const db = this.client.db('cat_database'); 
    const collection = db.collection<CatShelter>('cat_shelters'); 
    return collection; 
}

    public async insertCatShelter(catShelter: CatShelter): Promise<void>{
        try { 
            // validate the cat
            let valResp = catShelterValidator(catShelter);
            
            if(!valResp.valid){
                throw new Error(valResp.errorsAsString());
            }
            // Connect to MongoDB 
            const collection = await this.setUpCatShelterDb()

            // Insert the cat into the collection 
            const result = await collection.insertOne(catShelter); 
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
    public async getAllCatShelters(): Promise<WithId<CatShelter>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            const collection = await this.setUpCatShelterDb();

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
    public async getShelterWithCat(catName:string): Promise<WithId<CatShelter>[] | void>{
        let result;
        try { 
            // Connect to MongoDB 
            const collection = await this.setUpCatShelterDb();

            // need toArray to actually get a list of cats
            result = await collection.find({'catDescriptions.name':catName}).toArray();
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

    // public async getCatsByColor(catColor:string): Promise<WithId<Cat>[] | void>{
    //     let result;
    //     try { 
    //         // Connect to MongoDB 
    //         const collection = await this.setUpCatDb();

    //         // need toArray to actually get a list of cats
    //         result = await collection.find({color: catColor}).toArray();
    //         console.log(result);
    //         return result;

    //     } catch (error) { 
    //         console.error('Error:', error);
    //     } 
    //     finally { 
    //         await this.client.close(); 
    //         console.log('Disconnected from MongoDB'); 
    //     }
    // }
}