#!/bin/bash
docker build -t ts-express-mongo .
docker run -p 3000:3000 --name myapp ts-express-mongo
