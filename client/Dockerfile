FROM node:12-alpine as base
WORKDIR /var/build

COPY ./ ./

RUN apk add yarn
RUN yarn add global react-scripts
RUN yarn install

EXPOSE 3000