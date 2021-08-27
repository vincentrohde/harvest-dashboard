FROM node:14 as build-service
# Create app directory
WORKDIR /app
COPY . .
RUN npm install --verbose

# build files
RUN npm run build

# nginx part
FROM nginx:latest as nginx-server
RUN mkdir /app
COPY --from=build-service /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
