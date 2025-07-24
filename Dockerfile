# Use Node to build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use nginx to serve the static files
FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# COPY --from=builder /app/dist .
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]