FROM cypress/base:16.14.2-slim

WORKDIR /app

RUN mkdir cypress

COPY --chown=node:node package.json .
RUN yarn install

COPY --chown=node:node cypress.config.js .
COPY --chown=node:node cypress cypress/

ENTRYPOINT ["yarn", "cypress"]
CMD ["run"]
