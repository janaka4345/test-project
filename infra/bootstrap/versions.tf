terraform {
  required_version = "~> 1.16"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 8.7"
    }
  }

  backend "gcs" {
    bucket = "jk-cd-cicd-tfstate" # backend blocks can't use variables
    prefix = "bootstrap"
  }
}
