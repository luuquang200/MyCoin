FROM node:16-alpine

# Create and switch to the /app directory
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to /app
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
