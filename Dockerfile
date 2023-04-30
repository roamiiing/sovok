FROM node:16-alpine3.11

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
