FROM node:16.15.0-alpine3.14
# M1 mac で動作しているnpmのバージョン v14.18.1 ~
# https://nodejs.org/ja/download/releases/
WORKDIR /usr/src/app

RUN apk update
RUN npm install -g npm @vue/cli