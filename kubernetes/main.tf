provider "aws" {
  region = var.region
}

data "aws_eks_cluster" "cluster" {
  name = var.cluster_name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args = [
      "eks",
      "get-token",
      "--cluster-name",
      data.aws_eks_cluster.cluster.name
    ]
  }
}

# Schedule the NGINX deployment
resource "kubernetes_deployment" "nginx" {
  metadata {
    name = "auger-arch-client"
    labels = {
      App = "AugerArchClient"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        App = "AugerArchClient"
      }
    }

    template {
      metadata {
        labels = {
          App = "AugerArchClient"
        }
      }

      spec {
        container {
          name  = "auger-arch-client"
          image = "992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/client:latest"
        }
      }
    }
  }
}

# LoadBalancer, which routes traffic from the external load balancer to pods with the matching selector.
resource "kubernetes_service" "nginx" {
  metadata {
    name = "auger-arch"
  }

  spec {
    selector = {
      App = kubernetes_deployment.nginx.spec.0.template.0.metadata[0].labels.App
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}
