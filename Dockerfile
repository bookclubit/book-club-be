# 1. Базовый образ
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# 2. Установка зависимостей
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 3. Сборка приложения
FROM deps AS build
COPY . .
COPY prisma ./prisma

# Генерируем Prisma Client для production
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
RUN bunx prisma generate

# Билд NestJS
ENV NODE_ENV=production
RUN bun run build

# 4. Production образ (минимальный)
FROM oven/bun:1 AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Только production-зависимости
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Prisma schema и сгенерированный клиент
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/node_modules/@prisma ./node_modules/@prisma

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["bun", "dist/main.js"]
