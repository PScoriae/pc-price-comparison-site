FROM docker.io/library/node:19-alpine

RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g pnpm

# split ADD into two parts to take advantage of layering system
# builder will use cache if there are no changes in dependencies
COPY package.json pnpm-lock.yaml /usr/src/app

RUN pnpm i

COPY . /usr/src/app
ENV MONGO_URL mongodb://localhost:27017/pc-comparison
RUN pnpm run build

CMD node ./build/index.js