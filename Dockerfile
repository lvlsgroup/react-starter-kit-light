FROM node:10.13.0 as builder
ARG GITHUB_PERSONAL_ACCESS_TOKEN
WORKDIR /builder
COPY package.json .
COPY babel.config.js .
COPY .browserslistrc .
COPY src ./src
COPY scripts ./scripts
COPY webpack ./webpack
COPY bin ./bin
COPY .npmrc .
ENV APP_PORT=3000
ENV NODE_ENV=development

RUN npm install --loglevel error
RUN npm run buildscript

FROM node:10.13.0-alpine
ARG GITHUB_PERSONAL_ACCESS_TOKEN
ENV APP_PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /app
COPY --from=builder /builder/_build_prod ./_build_prod
COPY --from=builder /builder/package.json .
COPY --from=builder /builder/.npmrc .
RUN npm install --only=production --loglevel error
CMD ["npm", "run", "prod"]

