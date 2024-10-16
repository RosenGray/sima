FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

# Ensure ts-node-dev has execute permissions
RUN chmod +x node_modules/.bin/ts-node-dev

CMD ["npm", "start"]