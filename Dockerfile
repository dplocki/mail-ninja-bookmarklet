FROM node:22-alpine

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "build"]