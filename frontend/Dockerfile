FROM node:12.17-alpine as build

ARG REACT_APP_API_URL 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

FROM nginx:1.13.3-alpine

RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime 
RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]