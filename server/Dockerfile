FROM node:12-alpine
# Create app directory
WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . .

# start server
EXPOSE 8080

CMD ["nodemon", "app.js"]