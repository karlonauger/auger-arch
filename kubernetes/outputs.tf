output "load_balancer_ip" {
  description = "Load Balancer public IP address"
  value = kubernetes_service.nginx.status.0.load_balancer.0.ingress.0.hostname
}
