# Don't change unless needed

FROM node:18-alpine

WORKDIR /app

COPY frontend .

COPY nextjs.env .env.production

RUN npm install

RUN npm run build

CMD ["npm", "start", "--", "-H", "0.0.0.0"]
