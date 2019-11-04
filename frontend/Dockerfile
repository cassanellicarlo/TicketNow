#### Stage 1: Build the react application
FROM node:alpine as build

RUN mkdir -p /opt/app
ENV PROJECT_HOME /opt/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH $PROJECT_HOME/node_modules/.bin:$PATH

# copy package json
ARG PACKAGE="./package.json"
COPY $PACKAGE $PROJECT_HOME/package.json

WORKDIR $PROJECT_HOME

# install dependencies
RUN npm install

# copy app folders
COPY ./src $PROJECT_HOME/src
COPY ./public $PROJECT_HOME/public

# build for production
RUN npm run build

#### Stage 2: Serve the React application from Nginx 
FROM nginx:latest

# Copy the react build from Stage 1
COPY --from=build /opt/app/build /var/www

# Copy our custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
