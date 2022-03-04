FROM node:16-slim

ADD package*.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]