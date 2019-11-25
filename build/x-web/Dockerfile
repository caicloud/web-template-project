FROM cargo.caicloud.xyz/devops_release/modularize-web-base:v0.6.0 as web_cacher
# will be pruned by label-filter
LABEL stage=web_cacher
COPY . /usr/app/
WORKDIR /usr/app
RUN yarn install --production --cache-folder /yarn/.cache

FROM cargo.caicloud.xyz/library/node:10.16-stretch
COPY ./dist /usr/app
WORKDIR /usr/app

CMD ["node", "server.js"]
