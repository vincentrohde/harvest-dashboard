FROM node:12-alpine
# Create app directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8080
CMD node ./server/app.js