# mongo_cats
A simple application to practice proper back-end design and to get familiar with mongodb. All including cats of course!

First, run:
```bash
./start_podman.sh
```

Second, run:
```bash
./start_app.sh
```

To use integrated terminal with mongo container:
```bash
podman exec -it mongodb bash
```

Then to view cats in database:
```bash
mongosh
# then...
use cat_database
# then...
db.cats.find().pretty()
```

To run migrations:
```bash
mongosh
```

```bash
# to migrate up
ts-node migrations/index.ts up
```

```bash
# to migrate down (all migrations)
ts-node migrations/index.ts down -a
```

Next steps: build out some more classes, and work on implementing validation with something more complex