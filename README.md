# Book Club BackEnd

Backend книжного клуба для фронтенд-разработчиков. NestJS + Prisma + grammY.

## Get started

1. `bun install`
2. Скопируй `.env.example` → `.env`, заполни значения
3. `docker compose up -d`
4. `bun run prisma:migrate`
5. `bun run prisma:gen`
6. `bun run start:dev`

## Claude Code Setup

Проект использует [Claude Code](https://claude.com/claude-code) как основной AI-инструмент разработки. Настройка ниже.

### 1. Установить Claude Code

```bash
# VS Code extension или CLI
npm install -g @anthropic-ai/claude-code
```

### 2. MCP серверы

Три MCP нужны для полноценной работы. Настраиваются в `~/.claude.json` → `mcpServers`:

**Context7** — актуальные доки библиотек (NestJS, Prisma, grammY):

```bash
npx ctx7@latest setup
# Выбрать: MCP server → Claude Code
# Авторизоваться в браузере
```

**GitHub** — issues, PR, code search:

```bash
# Создать classic PAT: GitHub → Settings → Developer settings → Tokens (classic)
# Scopes: repo, project, read:org
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer YOUR_PAT"}}'
```

**Figma** — макеты:

```bash
claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
# После рестарта: /mcp → figma → Authenticate
```

### 3. GitHub CLI

```bash
gh auth login
# Если несколько аккаунтов — переключение:
gh auth switch -u Art-Frich
```

### 4. Структура контекста

Проект использует **mono-claude** паттерн — общий контекст на уровне организации:

```
book-club-org/                     ← git repo (bookclubit/book-club-org)
├── CLAUDE.md                      ← общие правила, архитектура, конвенции
├── .claude/
│   ├── skills/                    ← /run, /team-lead, /developer, /review, /spec, /refactor
│   ├── templates/                 ← шаблоны спек и тест-кейсов
│   └── references/                ← github-digest.md, figma-digest.md
│
└── book-club-be/                  ← этот репо (bookclubit/book-club-be)
    ├── CLAUDE.md                  ← специфика бэкенда (@package.json, @CONTRIBUTING)
    └── .claude/
        ├── settings.json          ← permissions, hooks, env
        └── hooks/stop.sh          ← typecheck после изменений TS
```

Claude загружает `CLAUDE.md` из родительских директорий — поэтому при работе в `book-club-be/` видит оба файла.

### 5. Скилы

| Команда      | Что делает                                                          |
| ------------ | ------------------------------------------------------------------- |
| `/run`       | Оркестратор — triage задачи, выбор стратегии, полный pipeline до PR |
| `/spec`      | Создание спеки (tasks.md, requirements.md, design.md)               |
| `/team-lead` | Мульти-агентная параллельная реализация через worktrees             |
| `/developer` | Агент-исполнитель (вызывается team-lead'ом)                         |
| `/review`    | Code review (scoped / deep / scope review)                          |
| `/refactor`  | Plan-first рефакторинг                                              |

### 6. References

В `.claude/references/` на org-level хранятся дайджесты:

- **github-digest.md** — полная выжимка из GitHub Project: все issues, комменты, принятые решения, release strategy
- **figma-digest.md** — все экраны макета, user flow, архитектура системы, геймификация, сущности

Эти файлы — контекст для Claude, не для ручного чтения. Обновляются по мере развития проекта.

### 7. Память

Claude хранит контекст между сессиями в `~/.claude/projects/{project}/memory/`:

- `user_profile.md` — профиль разработчика
- `project_architecture_decisions.md` — ключевые решения
- `feedback_communication.md` — стиль коммуникации
- `project_backlog_digest.md` — состояние бэклога
