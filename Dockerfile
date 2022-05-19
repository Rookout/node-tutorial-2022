from node:16-slim

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY index.js ./

ENTRYPOINT [ "npm", "start" ]