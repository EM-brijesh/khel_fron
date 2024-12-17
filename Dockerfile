# Step 1: Build the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app using Vite
RUN npm run build

# Step 2: Serve the app using a lightweight HTTP server (Nginx)
FROM nginx:alpine

# Copy the build artifacts from the first stage (from /app/dist to /usr/share/nginx/html)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
