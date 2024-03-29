FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev && npm i pm2 -g
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/midas-backend.config.js .
EXPOSE 80
CMD ["pm2-runtime", "start", "midas-backend.config.js"]


