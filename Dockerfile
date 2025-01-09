FROM node:20.16-alpine3.20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:ssr

FROM node:20.16-alpine3.20 as production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["npm", "run", "serve:ssr"]
