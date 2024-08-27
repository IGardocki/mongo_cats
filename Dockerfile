FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npx tsc

EXPOSE 3000
CMD [ "node", "dist/index.js" ]