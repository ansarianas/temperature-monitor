FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install -g npm-run-all

RUN npm install

COPY . .

EXPOSE 3000 4000 5678

CMD ["npm-run-all", "--parallel", "socket", "offline"]