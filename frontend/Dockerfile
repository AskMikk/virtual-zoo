FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache chromium chromium-chromedriver udev ttf-freefont
RUN mkdir -p /app/.angular/cache && chmod -R 777 /app/.angular
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
