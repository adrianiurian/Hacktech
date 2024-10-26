# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

ENV CLIENT_ID ${CLIENT_ID}
ENV REDIRECT_URI ${REDIRECT_URI}

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN echo ${PORT}

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]