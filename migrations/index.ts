import { mongoMigrateCli } from 'mongo-migrate-ts';

// had to create this to interact with db
mongoMigrateCli({
  uri: 'mongodb://localhost:27017',
  database: 'db',
  migrationsDir: __dirname,
  migrationsCollection: 'migrations_collection',
});