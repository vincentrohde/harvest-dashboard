FROM node:14-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./api/package.json .
RUN npm ci

COPY ./api .

EXPOSE 8080

CMD ["npm", "run", "start"]
