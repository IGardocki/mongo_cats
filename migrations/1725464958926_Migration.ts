import { Db, MongoClient } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Transaction1691171075957 implements MigrationInterface {
  public async up(db: Db, client: MongoClient): Promise<void | never> {
    await db.createCollection('new_collection');
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        // this does not seem to be inserting properly...
        await db.collection('mycol').insertOne({ foo: 'one' });
        await db.collection('mycol').insertOne({ foo: 'two' });
        await db.collection('mycol').insertOne({ foo: 'three' });
      });
    } finally {
      await session.endSession();
    }
  }

  public async down(db: Db, client: MongoClient): Promise<void | never> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('mycol').deleteOne({ foo: 'one' });
        await db.collection('mycol').deleteOne({ foo: 'two' });
        await db.collection('mycol').deleteOne({ foo: 'three' });
      });
    } finally {
      await session.endSession();
    }
  }
}