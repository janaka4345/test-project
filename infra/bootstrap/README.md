$prefix  = "jk-cd"                       # your choice, lowercase
$cicd    = "$prefix-cicd"
$billing = "ACCOUNT_ID"

gcloud projects create $cicd --name="cicd" --labels=env=cicd,course=cicd
gcloud billing projects link $cicd --billing-account=$billing
# If this fails with a billing quota error, stop and tell me: that decides the project layout for Lesson 14.

gcloud services enable storage.googleapis.com cloudresourcemanager.googleapis.com serviceusage.googleapis.com --project=$cicd

gcloud storage buckets create "gs://$cicd-tfstate" --project=$cicd `
  --location=us-central1 --uniform-bucket-level-access --public-access-prevention
gcloud storage buckets update "gs://$cicd-tfstate" --versioning
gcloud storage buckets describe "gs://$cicd-tfstate" --format="yaml(versioning,iamConfiguration.publicAccessPrevention,iamConfiguration.uniformBucketLevelAccess)"