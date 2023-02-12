#!/bin/bash
APP_NAME=$1
ENV="${2:-"production"}"
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

npm install nx

if [[ $ENV == "production" ]]; then
  echo "-------------Building module $APP_NAME with production-------------"
  npx nx build $APP_NAME || { echo 'Build code failed' ; exit 1; }
  cd $DIR_SERVICE
  echo "-------------Building $APP_NAME with production-------------"
  docker-compose build --no-cache
else
  echo "-------------Building $APP_NAME with development--------------"
  cd $DIR_SERVICE
  docker-compose -f docker-compose.dev.yml build --no-cache
fi
