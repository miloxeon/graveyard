FROM node:8.9.1-alpine

RUN apk add --no-cache --virtual .build-deps \
    binutils-gold \
    curl \
    g++ \
    gcc \
    libgcc \
    gnupg \
    linux-headers \
    make \
    python

RUN apk del .build-deps
