variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
    description = "Name of the EKS Cluster being deployed to"
    type        = string
    default     = "auger-arch-eks"
}
