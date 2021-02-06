FROM node:12.13.0 as builder
ARG github_token
ENV GITHUB_PERSONAL_ACCESS_TOKEN=$github_token
WORKDIR /builder
COPY package.json .
COPY babel.config.js .
COPY .browserslistrc .
COPY postcss.config.js .
COPY src ./src
COPY scripts ./scripts
COPY webpack ./webpack
COPY bin ./bin
COPY .npmrc .
COPY .env .
ENV APP_PORT=3000
ENV NODE_ENV=development

RUN npm install --loglevel error
RUN npm run buildscript

FROM node:12.13.0-alpine
ARG github_token
ENV GITHUB_PERSONAL_ACCESS_TOKEN=$github_token
ENV APP_PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /app
COPY --from=builder /builder/_build_prod ./_build_prod
COPY --from=builder /builder/package.json .
COPY --from=builder /builder/.npmrc .
RUN npm install --only=production --loglevel error
CMD ["npm", "run", "prod"]
