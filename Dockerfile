FROM node:16-slim

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY index.js ./
COPY app.js ./
COPY static/ ./static/

ENTRYPOINT [ "npm", "start" ]