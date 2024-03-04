#!/bin/bash

echo "Pre-Build Steps:"
echo "authenticating with AWS ECR..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 992382708286.dkr.ecr.us-east-1.amazonaws.com

echo "Build Steps:"

echo "building server image..."
docker build -t 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/server:latest ./server

echo "building client image..."
docker build -t 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/client:latest ./client

echo "Done!"
