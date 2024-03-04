#!/bin/bash

echo "Deploy Steps:"
echo "pushing server image to AWS ECR..."
docker push 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/server:latest

echo "pushing client image to AWS ECR..."
docker push 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/client:latest

echo "updating AWS EKS service..."
aws eks --region us-east-1 update-kubeconfig --name auger-arch-eks

echo "restarting server..."
kubectl rollout restart deployment auger-arch-server

echo "restarting client..."
kubectl rollout restart deployment auger-arch-client

echo "Done!"
