# Book club BackEnd

### Just our pet project for us

## Get started

1. Установите зависимости:

```bash
bun install
```

2. Настройте Infisical (секреты вместо локального `.env`):

```bash
npm install -g @infisical/cli
infisical login -i
infisical init
```

После этого локальный каталог будет привязан к нужному проекту и окружению в Infisical.

3. Поднимите инфраструктуру:

```bash
docker compose up -d
```

4. Примените миграции и сгенерируйте Prisma client:

```bash
bun run prisma:migrate
bun run prisma:gen
```

5. Запустите backend с секретами из Infisical:

```bash
bun run start:infisical
```
