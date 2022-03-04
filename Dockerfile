FROM node:16

ADD package*.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/www/app && cp -a /tmp/node_modules /var/www/app

WORKDIR /var/www/app
COPY . /var/www/app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]