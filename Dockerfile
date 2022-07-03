FROM node:16-slim

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY index.js ./
COPY app.js ./

ENTRYPOINT [ "npm", "start" ]