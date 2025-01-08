FROM node:20.16-alpine3.20 as dev-deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20.16-alpine3.20 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:ssr

FROM node:20.16-alpine3.20 as prod-deps
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "dist/portfolio/server/main.js"]
