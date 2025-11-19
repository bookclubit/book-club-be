# Book Club Backend

Pet‑проект на NestJS + Bun + Prisma + PostgreSQL.

## Быстрый старт (dev, Docker)

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up --build
```
миграции

```bash
docker exec -it book-club-be-dev bunx prisma migrate dev
```
## Production

- Образы: `antonpomazkov/book-club-be:<version>` в Docker Hub.
- Прод‑окружение: `docker-compose.prod.yml` + `.env.prod`.
- Workflow GitHub Actions: `.github/workflows/docker-build.yml`.

Подробное описание деплоя и версионирования см. в `docs/deployment.md`.
