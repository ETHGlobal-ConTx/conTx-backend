# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application's dependencies
RUN npm install
RUN npm i -g pm2

# If you're building your code for production
# RUN npm ci --only=production

# Bundle the app's source code inside the Docker image
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3003

# Start the application with PM2 Runtime
CMD [ "pm2-runtime", "src/index.js" ]
