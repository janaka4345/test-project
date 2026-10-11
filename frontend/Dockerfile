FROM node:22-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@12.3.4
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-write-config.sh /docker-entrypoint.d/40-write-config.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-write-config.sh \
    && chmod +x /docker-entrypoint.d/40-write-config.sh
COPY --from=build /app/dist /usr/share/nginx/html
