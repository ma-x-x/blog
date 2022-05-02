# Common build stage
FROM node:alpine as  common-build-stage
WORKDIR /app
ADD package.json ./
RUN yarn config set registry https://registry.npm.taobao.org && yarn config set ignore-engines true &&\
    yarn global add node-pre-gyp node-gyp gyp && yarn install
ADD ./ ./
EXPOSE 4000

# Development build stage
FROM common-build-stage as development-build-stage

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "docker-entrypoint.sh" ]

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
