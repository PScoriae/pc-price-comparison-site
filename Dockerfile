FROM docker.io/library/node:19-alpine

# setup directory for app
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
WORKDIR /usr/src/app

# install pnpm
RUN npm install -g pnpm

# split ADD into two parts to take advantage of layering system
# builder will use cache if there are no changes in dependencies
COPY package.json pnpm-lock.yaml /usr/src/app

# install deps
RUN pnpm i

COPY . /usr/src/app

RUN pnpm run build

ENV MONGO_URL mongodb://db:27017/pc-comparison-site

CMD node ./build/index.js
