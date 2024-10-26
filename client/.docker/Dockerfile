# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /client

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /client/dist /usr/share/nginx/html

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]