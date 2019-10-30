FROM node:12-alpine as base
WORKDIR /var/build

COPY ./ ./
RUN apk add yarn
RUN yarn install

EXPOSE 4200
EXPOSE 9229