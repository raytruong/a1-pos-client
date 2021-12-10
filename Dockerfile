FROM electronuserland/builder:wine

ARG DB_USER
ARG DB_PASS
ARG DB_BASEURL

ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_BASEURL=$DB_BASE_URL

RUN apt-get update

WORKDIR /src/app

COPY . .

RUN npm install

RUN npm run electron:build:linux