FROM node:20.14.0-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
COPY client/package*.json client/

RUN npm ci

COPY client/ ./client/

WORKDIR /app/client

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=${REACT_APP_API_URL}

RUN npm run build

FROM node:20.14.0-alpine3.20

WORKDIR /app

COPY --from=builder /app/client/build ./build

RUN npm install -g serve

RUN echo '{"status":"healthy"}' > /app/build/health.json

EXPOSE 80
EXPOSE 443

CMD ["serve", "-s", "build", "-l", "80"]
