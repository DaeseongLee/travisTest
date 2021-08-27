FROM node:14

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npx sequelize db:create

RUN npm install pm2 -g

RUN chown -R node /app
USER node

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
