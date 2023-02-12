#!/bin/bash
APP_NAME=$1
DIR_SERVICE="./apps/$APP_NAME-gateway"
echo "$DIR_SERVICE"
if [ -d "$DIR_SERVICE" ]; then
    echo "'$APP_NAME' already exists"
    exit 1
fi
npx hygen gateway new $APP_NAME