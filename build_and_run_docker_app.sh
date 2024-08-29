#!/bin/bash
docker build -t mongo_cats .
docker run -p 3000:3000 --name mongo_cats mongo_cats
