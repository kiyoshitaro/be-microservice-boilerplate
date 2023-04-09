#!/bin/bash
GLOBAL_ENV=".env.global.dev"
GLOBAL_ENV_SAMPLE="env.global.sample"
LOCAL_DOCKER_COMPOSE="docker-compose.local.yml"
DOCKER_COMPOSE="docker-compose.yml"
#
# npm install nx
if [[ ! -f $GLOBAL_ENV ]]; then
    cp $GLOBAL_ENV_SAMPLE $GLOBAL_ENV
    echo "CREATED $GLOBAL_ENV"
fi

if [[ ! -f $LOCAL_DOCKER_COMPOSE ]]; then
    cp $DOCKER_COMPOSE $LOCAL_DOCKER_COMPOSE
    echo "CREATE $LOCAL_DOCKER_COMPOSE"
fi

# build docker
DIR_APP="./apps"
for FILE in $DIR_APP/*; do
    ENV_FILE="$FILE/.env.dev"
    if [[ ! -f $ENV_FILE ]]; then
        touch $ENV_FILE
        echo "CREATE $ENV_FILE"
    fi
    SERVICE="${FILE##*/}"
    # ./build-docker.sh $SERVICE
done

echo "START LOCAL DOCKER COMPOSE"
./start-local.sh







