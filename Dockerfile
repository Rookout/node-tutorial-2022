FROM node:16.15.1-slim as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM dependencies as build
COPY src/index.js ./src/
COPY src/app.js ./src/
COPY babel.config.json ./
COPY static/ ./static/
RUN npm run build

FROM dependencies as release
COPY --from=build /app/dist /app/dist
COPY --from=build /app/static /app/static
ENTRYPOINT [ "npm", "start" ]