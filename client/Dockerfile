# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

ARG CLIENT_ID
ARG REDIRECT_URI

RUN echo "CLIENT_ID: $CLIENT_ID" > .env
RUN echo "REDIRECT_URI: $REDIRECT_URI" >> .env

RUN cat .env

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY .env /usr/share/nginx/html/.env
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]