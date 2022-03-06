FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ARG DB_CONN
ARG GCLOUD_PROJECT
ARG GCS_BUCKET
ARG GCS_KEYFILE
ARG LOGIN
ARG PASSWORD
ARG JWT_SECRET

ENV NODE_ENV=${NODE_ENV}
ENV DB_CONN=${DB_CONN}
ENV GCLOUD_PROJECT=${GCLOUD_PROJECT}
ENV GCS_BUCKET=${GCS_BUCKET}
ENV GCS_KEYFILE=${GCS_KEYFILE}
ENV LOGIN=${LOGIN}
ENV PASSWORD=${PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 80
EXPOSE 443
CMD ["node", "dist/main"]