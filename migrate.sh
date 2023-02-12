#!/bin/bash
SERVICE_NAME=$1
DIR_SERVICE="./apps/$SERVICE_NAME"
echo "$DIR_SERVICE"
if [ -d "$DIR_SERVICE" ];
then
    KNEX_PATH="./apps/$SERVICE_NAME/build/configs/knex.ts"
    npx knex --knexfile $KNEX_PATH --env=postgres migrate:latest
    exit 1
else
    echo "'$SERVICE_NAME' does not exists"
fi