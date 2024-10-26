# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

RUN ls -la
RUN pwd

COPY package.json package-lock.json .env ./
RUN npm install

RUN ls -la

COPY . .
RUN npm run build

RUN ls -la

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]