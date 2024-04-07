FROM node:latest

WORKDIR ./prod

COPY . .

RUN npm install

RUN npm i nodemon -g

EXPOSE 5000

CMD npm start