FROM node:18.2.0-alpine3.14

WORKDIR /home/app

COPY . .

RUN npm install
RUN chmod +x env.sh && ./env.sh

CMD [ "npm", "run", "dev" ]