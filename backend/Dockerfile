FROM node:12.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 3333

ENTRYPOINT [ "npm", "start" ]
