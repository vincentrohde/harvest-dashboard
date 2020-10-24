FROM node:12-alpine
# Create app directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# start server
EXPOSE 8080
CMD node ./app.js