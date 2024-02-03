FROM node:21.5.0-alpine

WORKDIR /path-finder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 6060

CMD ["npm", "start"]