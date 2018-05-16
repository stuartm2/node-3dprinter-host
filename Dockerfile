FROM node:alpine
WORKDIR /app/
COPY src .
COPY package.json .
RUN npm install
VOLUME /gcode/
EXPOSE 3000
CMD node server.js
