#!/bin/bash

# set REGISTRY ke alamat docker registry
# jika tidak diset akan otomatis ke 10.244.65.16:16379
# export REGISTRY=localhost:5000

PARENT_DIR="nsrb"
CURRENT_DIR="auth"
IMAGE_NAME="$PARENT_DIR/$CURRENT_DIR"
if [ -z "$1" ]
then
{
TAG="$(git log -1 --pretty=\%h)"
} || {
exit 99
}
else
TAG=$1
fi
if [ -z "${REGISTRY}" ]
then
REGISTRY="docker.devnesia.org"
fi

echo -e "REGISTRY \e[33m$REGISTRY\e[0m
IMAGE \e[33m$IMAGE_NAME\e[0m
TAG \e[33m$TAG\e[0m"

echo -e "Tagging image as \e[33m$REGISTRY/$IMAGE_NAME/$TAG\e[0m"

docker build -t ${REGISTRY}/${IMAGE_NAME}:${TAG} -t ${REGISTRY}/${IMAGE_NAME}:latest .
docker push ${REGISTRY}/${IMAGE_NAME}