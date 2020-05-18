# Stage 1: npm install and build angular
FROM node:14.2.0 as build
LABEL author="Sam Brysbaert"
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 2: nginx setup
FROM nginx
COPY --from=build /app/dist/fe-collect /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf
