# Build app from source
FROM node:latest AS builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build


# Make app available with nginx server
FROM nginx:latest

#COPY nginx.conf /etc/nginx

CMD type /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
