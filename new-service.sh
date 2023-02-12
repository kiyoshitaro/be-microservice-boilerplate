#!/bin/bash
APP_NAME=$1
DIR_SERVICE="./apps/$APP_NAME-service"
echo "$DIR_SERVICE"
if [ -d "$DIR_SERVICE" ]; then
    echo "'$APP_NAME' already exists"
    exit 1
fi
npx hygen service new $APP_NAME