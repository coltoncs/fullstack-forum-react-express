#!/bin/bash

echo What should the version be?
read VERSION 

docker build -t opizdetz/fullstack-forum-react-express:$VERSION .
docker push opizdetz/fullstack-forum-react-express:$VERSION 
ssh root@142.93.186.50 "docker pull opizdetz/fullstack-forum-react-express:$VERSION && docker tag opizdetz/fullstack-forum-react-express:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"