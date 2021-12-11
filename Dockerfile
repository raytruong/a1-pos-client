FROM electronuserland/builder:wine

ARG TARGET=linux
ENV TARGET=$TARGET

RUN apt-get update

WORKDIR /app

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npm install && npm run electron:build:$TARGET"]
