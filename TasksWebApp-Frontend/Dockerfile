FROM node:22.17.1-alpine
WORKDIR /app
COPY package*.json ./
COPY angular.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build -- --configuration production
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder ./dist/tasks-frontend .
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]