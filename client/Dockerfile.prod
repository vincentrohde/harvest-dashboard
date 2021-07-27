FROM node:12-alpine as build-service
# Create app directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# build files
RUN npm run build

# nginx part

FROM nginx:latest as nginx-server
RUN mkdir /app
COPY --from=build-service /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
