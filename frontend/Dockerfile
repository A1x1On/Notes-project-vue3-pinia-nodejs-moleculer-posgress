FROM --platform=linux/amd64 node:23-alpine

RUN npm install -g vite

WORKDIR /app

COPY ./frontend/package.json ./

RUN yarn install

COPY ./frontend/ .

EXPOSE 3007

CMD ["vite", "--host", "0.0.0.0", "--port", "3007"]