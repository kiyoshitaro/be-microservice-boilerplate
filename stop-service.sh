#!/bin/bash
APP_NAME=$1
if [ -z "$APP_NAME" ]; then
  echo "App name isn't empty"
  exit 1
fi
DIR_SERVICE="./apps/$APP_NAME"

if [ ! -d "$DIR_SERVICE" ]; then
  # Take action if $DIR exists. #
  echo "'$APP_NAME' doesn't exists"
  exit 1
fi

cd $DIR_SERVICE
docker-compose stop
