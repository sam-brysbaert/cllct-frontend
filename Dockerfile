# Stage 1: build and compile angular
#FROM node:14.2.0 as node
#LABEL author="Sam Brysbaert"
#WORKDIR /app
#COPY package.json /app/
#RUN npm install
#COPY ./ /app/
#ARG env=prod
#RUN npm run build

# Stage 2: nginx
#FROM nginx:alpine
#RUN 
#COPY --from=node /app/dist/fe-collect/* /usr/share/nginx/html/



FROM nginx
COPY /dist/fe-collect /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf
