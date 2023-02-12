#!/bin/bash
LOCAL_DOCKER_COMPOSE="docker-compose.local.yml"
if [ ! -f "$LOCAL_DOCKER_COMPOSE" ]; then
  echo "$LOCAL_DOCKER_COMPOSE does not exist"
  exit 1
fi

docker-compose -f docker-compose.local.yml up -d --build --remove-orphans