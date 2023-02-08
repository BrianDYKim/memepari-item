FROM node:18-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 3500

ENV PORT=3500 \
    APPLICATION_NAME="밈팔이닷컴 품목 서버" \
    NODE_ENV="development" \
    MONGODB_URL="mongodb+srv://brian:5wesome@5wesome-mongo.b26pfrp.mongodb.net/?retryWrites=true&w=majority" \
    AUTH_SERVER_URL="http://localhost:4000/api/users"

CMD ["pm2-runtime", "bin/index.js"]