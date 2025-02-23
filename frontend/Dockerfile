# Use the latest Node.js image
FROM node:current-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Start the Vite development server, bind to all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
