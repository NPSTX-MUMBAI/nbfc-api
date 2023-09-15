FROM node:18.6.0-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
COPY package.json ./

# Install app dependencies
RUN npm install -f

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

RUN pwd

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
