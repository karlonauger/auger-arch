#!/bin/sh

echo "Pre-Build Steps:"
echo "authenticating with AWS ECR..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 992382708286.dkr.ecr.us-east-1.amazonaws.com

echo "Build Steps:"
echo "building image..."
docker build -t 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/client:latest .

echo "Post-Build Steps:"
echo "pushing image to AWS ECR..."
docker push 992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/client:latest

# echo "updating AWS EKS service..."
aws eks --region us-east-1 update-kubeconfig --name auger-arch-eks
kubectl rollout restart deployment auger-arch-client

echo "Done!"
