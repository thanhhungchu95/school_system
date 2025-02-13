FROM node:22-alpine3.21 AS node

# Dev server, use to build application
FROM node AS server-dev
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

# Prod server, use to run application
FROM node AS server-prod
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --production

# Build application
FROM node AS server-builder
WORKDIR /app
COPY . .
COPY --from=server-dev /app/node_modules /app/node_modules
RUN yarn build

# Run application
FROM node AS server
ENV NODE_ENV=production
WORKDIR /app
COPY --from=server-prod /app/node_modules /app/node_modules
COPY --from=server-builder /app/dist /app/dist
COPY --from=server-builder /app/.env.production.local /app/.env
COPY --from=server-builder /app/start-application.sh /app/start-application.sh
RUN chmod +x /app/start-application.sh

# Expose port to access
EXPOSE 5000

# Run the server
ENTRYPOINT [ "sh", "./start-application.sh" ]