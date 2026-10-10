# Multi-stage production build for BrandBloom Frontend

# Stage 1: Build Vite bundle
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# Argument for backend API URL during build time
ARG VITE_API_BASE_URL=/api
ARG VITE_APP_NAME=BrandBloom
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
