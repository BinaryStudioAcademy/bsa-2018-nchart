#!/bin/bash

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker stop nchart && docker rm nchart && docker rmi -f $DOCKER_IMAGE_NAME && docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:9000 --name=nchart --env-file '1.env' $DOCKER_IMAGE_NAME"