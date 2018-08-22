#!/bin/bash

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud compute ssh $INSTANCE
docker kill $(docker ps -q)
docker pull $DOCKER_IMAGE_NAME
docker run -it -d -p 80:9000 --env-file '1.env' $DOCKER_IMAGE_NAME

# sleep 30
# npm run e2e_test