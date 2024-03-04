# Auger Architecture
Personal project built on the MERN (MongoDB, Express.js, React, Node.js) stack

## Prerequisites

Before running scripts, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS EKSctl](https://eksctl.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

## Available Scripts

In this dir you can run the following scripts:

### `scripts/setup.sh`

- Installs node dependencies

### `scripts/start.sh`

- Starts the server in development mode.
- Launches the React development server for the client.

### `scripts/build.sh`

- Authenticates with AWS ECR.
- Builds the Docker images for the server and client components.

### `scripts/deploy.sh`

- Pushes the Docker images to the AWS ECR repository.
- Restarts EKS Nodes

### `terraform -chdir=terraform apply`

- Deploy the VPC and Kuberneties Cluster

### `terraform -chdir=kubernetes apply`

- Deploy the Client Docker Image it ECR to the Kuberneties Cluster

### `scripts/test.sh`

- Runs unit tests for client and server
