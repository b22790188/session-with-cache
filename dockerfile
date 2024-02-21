FROM node:18-alpine AS builder

COPY package*.json tsconfig.json .env ./ 

COPY ./src ./src

RUN npm install && npm run build

FROM node:18-alpine

WORKDIR /app 

CMD ["node", "dist/index.js"]

COPY --from=builder package*.json ./

RUN npm install --only=production

COPY --from=builder ./dist ./dist







