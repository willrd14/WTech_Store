FROM node:22-alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm ci --omit=dev

COPY server/src/ ./src/

EXPOSE 3001

CMD ["node", "src/app.js"]
