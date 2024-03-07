provider "aws" {
  region = var.region
}

# Filter out local zones, which are not currently supported 
# with managed node groups
data "aws_availability_zones" "available" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

locals {
  cluster_name = "${var.project_name}-eks"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"

  name = "${var.project_name}-vpc"

  cidr = "192.168.0.0/16"
  azs  = slice(data.aws_availability_zones.available.names, 0, 2)

  private_subnets = ["192.168.128.0/18", "192.168.192.0/18"]
  public_subnets  = ["192.168.0.0/18", "192.168.64.0/18"]

  enable_nat_gateway   = true
  # single_nat_gateway   = true
  enable_dns_support = true
  enable_dns_hostnames = true

  map_public_ip_on_launch = true  # Enable auto-assign public IP addresses
  
  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = 1
  }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"

  cluster_name    = local.cluster_name
  cluster_version = "1.29"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = concat(module.vpc.private_subnets, module.vpc.public_subnets)
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    one = {
      name = "node-group-1"

      instance_types = ["t3.small"]

      min_size     = 1
      max_size     = 3
      desired_size = 1
    }
  }
}
