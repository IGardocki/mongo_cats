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