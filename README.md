# mongo_cats
A simple application to practice proper back-end design and to get familiar with mongodb. All including cats of course!

To use integrated terminal with mongo container:
```bash
podman exec -it mongodb bash
```

Then to view cats in database:
```bash
use cat_database
#then...
db.catsCollection.find().pretty()
```