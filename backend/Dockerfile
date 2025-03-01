FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "dev"]