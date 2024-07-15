FROM node:18
WORKDIR /opt/app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN npm install -g pnpm
RUN pnpm install
COPY . .
ARG NODE_ENV=production
RUN pnpm build
CMD ["pnpm", "preview"]
