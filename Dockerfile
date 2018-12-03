FROM node:10.6.0 as node
# Create app directory
RUN mkdir -p /home/frontend

WORKDIR /home/frontend

# Bundle app source
COPY . /home/frontend

RUN npm config set registry http://registry.cnpmjs.org \
    && npm install --verbose \
    && npm run build

FROM nginx

COPY --from=node /home/frontend/build /usr/share/nginx/html