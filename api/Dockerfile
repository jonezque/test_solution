FROM node:12-alpine as base
WORKDIR /var/build

COPY ./ ./
RUN apk add yarn
RUN yarn install
EXPOSE 3000
EXPOSE 4000
EXPOSE 9229