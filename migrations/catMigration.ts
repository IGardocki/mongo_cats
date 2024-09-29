import { Db, MongoClient } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { Cat } from '../src/domain/cat';

export class Transaction1691171075957 implements MigrationInterface {
  public async up(db: Db, client: MongoClient): Promise<void | never> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('cats').insertOne(new Cat('Mimi', 10, ['tabby']));
        await db.collection('cats').insertOne(new Cat('Romad', 13, ['orange', 'white']));
        await db.collection('cats').insertOne(new Cat('The Detective', 8, ['black', 'white']));
      });
    } finally {
      await session.endSession();
    }
  }

  public async down(db: Db, client: MongoClient): Promise<void | never> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('cats').deleteOne({ name: 'Mimi', age: 10, color: ['tabby'] });
        await db.collection('cats').deleteOne({ name: 'Romad', age: 13, color: ['orange', 'white'] });
        await db.collection('cats').deleteOne({ name: 'The Detective', age: 8, color: ['black', 'white']});
      });
    } finally {
      await session.endSession();
    }
  }
}