FROM node:lts-alpine
RUN npm -g install pm2

WORKDIR /server
COPY src/package*.json ./
RUN yarn install --production
COPY src/ /server
EXPOSE 8080
CMD ["pm2-runtime", "ecosystem.config.js"]
