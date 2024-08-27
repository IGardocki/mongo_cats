#!/bin/bash
# podman pull mongo:latest
podman machine init
podman machine start
podman run --name mongodb -p 27017:27017 mongo:latest
