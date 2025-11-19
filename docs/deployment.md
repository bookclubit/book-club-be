# Deployment & Environment Guide

## 1. Environments

- **Dev:** `Dockerfile.dev` + `docker-compose.dev.yml`
- **Prod:** multi‑stage `Dockerfile` + `docker-compose.prod.yml`
- **CI:** `.github/workflows/docker-build.yml` (сборка и push в Docker Hub)

---

## 2. Переменные окружения

### 2.1. `.env` (development)

```
DATABASE_URL=postgresql://myuser:mypassword@db:5432/bookclubdb
```

Используется в `docker-compose.dev.yml` (service `app`).

### 2.2. `.env.prod` (production)

```
DATABASE_URL=postgresql://produser:prodpassword@db:5432/bookclubdb
POSTGRES_USER=produser
POSTGRES_PASSWORD=prodpassword
POSTGRES_DB=bookclubdb
NODE_ENV=production
```

Используется в `docker-compose.prod.yml` для `app` и `db`.

---

## 3. Development 

### 3.1. Запуск dev‑окружения

```bash
docker compose -f docker-compose.dev.yml up --build
```

Поднимаются:

- `book-club-be-dev` — backend (Bun + NestJS, hot‑reload),
- `book-club-db` — Postgres 16.

Приложение доступно на `http://localhost:3000`.

### 3.2. Миграции и Prisma Client

Миграции:

```bash
docker exec -it book-club-be-dev bunx prisma migrate dev
```

Генерация Prisma Client:

```bash
docker exec -it book-club-be-dev bunx prisma generate
```

### 3.3. Остановка dev‑окружения

```bash
docker compose -f docker-compose.dev.yml down
```

## 5. Production


### 5.3. Первый релиз (0.0.1)

```bash
docker build -t antonpomazkov/book-club-be:0.0.1 .
docker push antonpomazkov/book-club-be:0.0.1
```

`docker-compose.prod.yml` уже ссылается на `:0.0.1`.

### 5.4. Деплой на сервер

1. Залить на сервер `docker-compose.prod.yml` и `.env.prod`.
2. Выполнить:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```
3. Применить миграции:

```bash
docker exec -it book-club-be bunx prisma migrate deploy
```

### 5.5. Обновление версии

1. Выбрать новую версию, напр. `0.0.2`.
2. Создать и запушить git‑тег (для CI):

```bash
git tag v0.0.2
git push origin v0.0.2
```

3. Дождаться, пока GitHub Actions соберёт и запушит `antonpomazkov/book-club-be:0.0.2`.
4. Обновить `docker-compose.prod.yml`:
5. На сервере:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker exec -it book-club-be bunx prisma migrate deploy
```

