provider "google" {
  project = var.cicd_project_id
  region  = var.region

  default_labels = {
    managed-by = "terraform"
    course     = "cicd"
  }
}

resource "google_project_service" "cicd" {
  for_each = toset([
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "monitoring.googleapis.com",
    "sts.googleapis.com",
  ])

  service            = each.key
  disable_on_destroy = false
}
