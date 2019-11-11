# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:slim as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install
RUN npm install -g @angular/cli@latest

COPY . .

RUN npm run build -- --output-path=./dist/out

# running tests
# RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# Copy the default nginx.conf
COPY --from=build-stage /app/nginx-custom.conf /etc/nginx/conf.d/default.conf
