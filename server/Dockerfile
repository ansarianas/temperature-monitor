FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install -g npm-run-all

RUN npm install

COPY . .

EXPOSE 9000 4000

CMD ["npm-run-all", "--parallel", "socket", "rest"]