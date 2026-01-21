FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build for production
RUN npm run build

EXPOSE 8080

# Serve the built files
CMD ["npm", "run", "start"]
