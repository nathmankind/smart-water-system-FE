# Use official Node.js base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app



# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy the rest of the code
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Vite files from builder stage into Nginx
# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]