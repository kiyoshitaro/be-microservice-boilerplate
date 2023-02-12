SERVICE_NAME=$1
MIGRATE_NAME=$2
DIR_SERVICE="./apps/$SERVICE_NAME"
echo "$DIR_SERVICE"
if [ -d "$DIR_SERVICE" ];
then
    KEX_PATH="./apps/$SERVICE_NAME/src/configs/knex.ts"
    npx knex --knexfile $KEX_PATH --env=postgres seed:make $MIGRATE_NAME
    exit 1
else
    echo "'$SERVICE_NAME' does not exists"
fi