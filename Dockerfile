FROM node:alpine

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ADD package*.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app/node_modules/puppeteer
RUN npm run install

WORKDIR /opt/app/
RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium
COPY . /opt/app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]