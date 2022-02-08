FROM alpine
WORKDIR /usr/src/app
COPY . ./
RUN apk add --update npm
RUN npm install
RUN cd frontend && npm install && npm run build
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
EXPOSE 3000