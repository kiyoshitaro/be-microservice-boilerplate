FROM node:18.12.1

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY ./build .

RUN npm install -g ts-node
USER node

#RUN npm ci
# run this for production
RUN npm install --production

COPY --chown=node:node . .

CMD node ./main.js
