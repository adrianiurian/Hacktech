# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

RUN ls -la
RUN pwd

ENV CLIENT_ID ${CLIENT_ID}
ENV REDIRECT_URI ${REDIRECT_URI}

COPY package.json package-lock.json ./
RUN npm install

RUN ls -la

COPY . .
RUN npm run build

RUN ls -la

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN echo $PORT

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]