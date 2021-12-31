FROM alpine
WORKDIR /usr/src/app
COPY . ./
RUN apk add --update npm
RUN npm install
RUN cd frontend && npm install && npm run build
EXPOSE 3000