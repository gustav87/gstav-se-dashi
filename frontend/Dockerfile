# nginx:stable-alpine doesn't contain npm, so we need to use the node image to run npm install first.

FROM node:25.9.0-alpine as build-stage
WORKDIR /app

COPY package.json package-lock.json tsconfig.json index.html ./
RUN npm install --frozen-lockfile
ADD src /app/src
ADD public /app/public

RUN npm run build

FROM nginx:stable-alpine as serve-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
