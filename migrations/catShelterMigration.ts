import { Db, MongoClient } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { CatShelter } from '../src/domain/catShelter';

export class Transaction1691171075958 implements MigrationInterface {
  public async up(db: Db, client: MongoClient): Promise<void | never> {
    const session = client.startSession();
    try {
        // public name: string = '', 
        // public yearsOpen: number = 0, 
        // public sqFootage: number = 0,
        // public catNumber: number = 0,
        // public catDescriptions: Record<string, string>[] = [{'name': '', 'temperament': 'none listed'}],
        // public employeeNames: string[] = [''],
        // public tnrProgram: boolean = false,
      await session.withTransaction(async () => {
        await db.collection('cat_shelters').insertOne(new CatShelter('ADL', 10, 1000, 2, 
            [{name: 'Imogen', description: 'spicy lass'}, {name: 'Whiskers', description: 'has whiskers'}],
            ['Spongebob', 'Patrick'], false
        ));

        await db.collection('cat_shelters').insertOne(new CatShelter('T. Russell Reitz', 15, 1500, 12, 
            [{name: 'Smoke', description: 'orange manx lass'}, {name: 'Fire', description:'grey manx lass'}],
            ['Shaggy', 'Scooby'], true
        ));
      });
    } finally {
      await session.endSession();
    }
  }

  public async down(db: Db, client: MongoClient): Promise<void | never> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('cat_shelters').insertOne(new CatShelter('ADL', 10, 1000, 2, 
            [{name: 'Imogen', description: 'spicy lass'}, {name: 'Whiskers', description: 'has whiskers'}],
            ['Spongebob', 'Patrick'], false
        ));

        await db.collection('cat_shelters').insertOne(new CatShelter('T. Russell Reitz', 15, 1500, 12, 
            [{name: 'Smoke', description: 'orange manx lass'}, {name: 'Fire', description: 'grey manx lass'}],
            ['Shaggy', 'Scooby'], true
        ));
      });
    } finally {
      await session.endSession();
    }
  }
}