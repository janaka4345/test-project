variable "cicd_project_id" {
  type        = string
  description = "Project that holds CI/CD shared resources: state, registry, identity federation."
}

variable "region" {
  type    = string
  default = "us-central1"
}
