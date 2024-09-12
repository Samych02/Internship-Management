# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the Next.js port (3000) to the outside network
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
