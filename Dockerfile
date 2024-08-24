# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN NODE_ENV=development npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Install a simple web server to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "5000"]
