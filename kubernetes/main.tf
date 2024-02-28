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
    name = "auger-arch-client"
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

# Domain Routing

data "aws_route53_zone" "auger_arch_zone" {
  name = "auger-architecture.com"
}

resource "aws_route53_record" "load_balancer_alias" {
  zone_id = data.aws_route53_zone.auger_arch_zone.zone_id
  name    = "auger-architecture.com"
  type    = "A"

  alias {
    name                   = kubernetes_service.nginx.status.0.load_balancer.0.ingress.0.hostname
    zone_id                = "Z35SXDOTRQ7X7K" // TODO Pull from Load Balancer or ommit if possible
    evaluate_target_health = true
  }
}

# Schedule the Backend Server deployment
resource "kubernetes_deployment" "server" {
  metadata {
    name = "auger-arch-server"
    labels = {
      App = "AugerArchServer"
    }
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        App = "AugerArchServer"
      }
    }
    template {
      metadata {
        labels = {
          App = "AugerArchServer"
        }
      }
      spec {
        container {
          name  = "auger-arch-server"
          image = "992382708286.dkr.ecr.us-east-1.amazonaws.com/auger-arch/server:latest"
          env {
            name = "ATLAS_URI"
            value = var.atlas_uri
          }
        }
      }
    }
  }
}

# LoadBalancer, which routes traffic from the front end pods with the matching selector.
resource "kubernetes_service" "server" {
  metadata {
    name = "auger-arch-server"
  }
  spec {
    selector = {
      App = kubernetes_deployment.server.spec.0.template.0.metadata[0].labels.App
    }
    port {
      port        = 8000
      target_port = 5000
    }
    type = "LoadBalancer"
  }
}
