FROM node:latest

WORKDIR ./prod

COPY . .

VOLUME ["/data"]

RUN npm install

CMD npm start