### 1. Установи Bun официальным скриптом

```bash
powershell -c "irm bun.sh/install.ps1|iex"
```

#### 1.1 Убедись, что Bun попал в PATH (обычно установщик добавляет строки сам, но если нет — добавь вручную в ~/.bashrc или ~/.zshrc):​

```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

https://bun.com/docs/installation

### 2. Установи Nest CLI глобально через Bun

```bash
bun add -g @nestjs/cli
```

### 3. Устанавлваем nest.js

```bash
bunx @nestjs/cli new . --package-manager bun --skip-install
bun install
```

### 4. Убрать Jest, ESLint из зависимостей

```bash
bun remove eslint @eslint/js typescript-eslint eslint-plugin-prettier prettier globals jest @types/jest ts-jest

```

#### 4.1 Также удалим ESLint‑конфиг eslint.config.mjs, он больше не нужен

### 5. Поставим oxlint (с type‑aware) через Bun

```bash
bun add -D oxlint oxlint-tsgolint

```

#### 5.1 Cгенерируем базовый конфиг для oxlint:

```bash
bunx oxlint --init
```

#### 5.2 Меняем базовый конфиг под себя:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",

  "env": {
    "builtin": true,
    "node": true
  },

  "plugins": ["unicorn", "typescript", "oxc"],

  "rules": {
    // === базовые JS-правила (из стандартного конфига) ===
    "for-direction": "warn",
    "no-async-promise-executor": "warn",
    "no-caller": "warn",
    "no-class-assign": "warn",
    "no-compare-neg-zero": "warn",
    "no-cond-assign": "warn",
    "no-const-assign": "warn",
    "no-constant-binary-expression": "warn",
    "no-constant-condition": "warn",
    "no-control-regex": "warn",
    "no-debugger": "warn",
    "no-delete-var": "warn",
    "no-dupe-class-members": "warn",
    "no-dupe-else-if": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-empty-character-class": "warn",
    "no-empty-pattern": "warn",
    "no-empty-static-block": "warn",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extra-boolean-cast": "warn",
    "no-func-assign": "warn",
    "no-global-assign": "warn",
    "no-import-assign": "warn",
    "no-invalid-regexp": "warn",
    "no-irregular-whitespace": "warn",
    "no-loss-of-precision": "warn",
    "no-new-native-nonconstructor": "warn",
    "no-nonoctal-decimal-escape": "warn",
    "no-obj-calls": "warn",
    "no-self-assign": "warn",
    "no-setter-return": "warn",
    "no-shadow-restricted-names": "warn",
    "no-sparse-arrays": "warn",
    "no-this-before-super": "warn",
    "no-unassigned-vars": "warn",
    "no-unsafe-finally": "warn",
    "no-unsafe-negation": "warn",
    "no-unsafe-optional-chaining": "warn",
    "no-unused-expressions": "warn",
    "no-unused-labels": "warn",
    "no-unused-private-class-members": "warn",
    "no-unused-vars": "warn",
    "no-useless-backreference": "warn",
    "no-useless-catch": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": "warn",
    "no-with": "warn",
    "require-yield": "warn",
    "use-isnan": "warn",
    "valid-typeof": "warn",

    // === oxc-специфичные правила ===
    "oxc/bad-array-method-on-arguments": "warn",
    "oxc/bad-char-at-comparison": "warn",
    "oxc/bad-comparison-sequence": "warn",
    "oxc/bad-min-max-func": "warn",
    "oxc/bad-object-literal-comparison": "warn",
    "oxc/bad-replace-all-arg": "warn",
    "oxc/const-comparisons": "warn",
    "oxc/double-comparisons": "warn",
    "oxc/erasing-op": "warn",
    "oxc/missing-throw": "warn",
    "oxc/number-arg-out-of-range": "warn",
    "oxc/only-used-in-recursion": "warn",
    "oxc/uninvoked-array-callback": "warn",

    // === TypeScript-правила (из стандартного + твои) ===
    "typescript/await-thenable": "warn",
    "typescript/no-array-delete": "warn",
    "typescript/no-base-to-string": "warn",
    "typescript/no-duplicate-enum-values": "warn",
    "typescript/no-duplicate-type-constituents": "warn",
    "typescript/no-extra-non-null-assertion": "warn",
    "typescript/no-floating-promises": "warn",
    "typescript/no-for-in-array": "warn",
    "typescript/no-implied-eval": "warn",
    "typescript/no-meaningless-void-operator": "warn",
    "typescript/no-misused-new": "warn",
    "typescript/no-misused-spread": "warn",
    "typescript/no-non-null-asserted-optional-chain": "warn",
    "typescript/no-redundant-type-constituents": "warn",
    "typescript/no-this-alias": "warn",
    "typescript/no-unnecessary-parameter-property-assignment": "warn",
    "typescript/no-unsafe-declaration-merging": "warn",
    "typescript/no-unsafe-unary-minus": "warn",
    "typescript/no-useless-empty-export": "warn",
    "typescript/no-wrapper-object-types": "warn",
    "typescript/prefer-as-const": "warn",
    "typescript/require-array-sort-compare": "warn",
    "typescript/restrict-template-expressions": "warn",
    "typescript/triple-slash-reference": "warn",
    "typescript/unbound-method": "warn",

    // — твоя настройка:
    "typescript/no-explicit-any": "off",
    "typescript/no-unsafe-argument": "warn",

    // === unicorn-правила ===
    "unicorn/no-await-in-promise-methods": "warn",
    "unicorn/no-empty-file": "warn",
    "unicorn/no-invalid-fetch-options": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-new-array": "warn",
    "unicorn/no-single-promise-in-promise-methods": "warn",
    "unicorn/no-thenable": "warn",
    "unicorn/no-unnecessary-await": "warn",
    "unicorn/no-useless-fallback-in-spread": "warn",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-spread": "warn",
    "unicorn/prefer-set-size": "warn",
    "unicorn/prefer-string-starts-ends-with": "warn"
  }
}
```

#### 5.3 Закомментируем правило "baseUrl": "./", в tsconfig

type‑aware режим oxlint работает поверх typescript-go (TS 7 API), а там опция baseUrl уже выпилена, поэтому твой обычный tsconfig.json для него «некорректен»

#### 5.4 Меняем скрипт для запуска с type-aware

```JSON
"lint": "oxlint --type-aware",
"lint:fix": "oxlint --type-aware --fix",

```

### 6 Перенести форматирование с Prettier на oxfmt

#### 6.1 Убрать Prettier из зависимостей

```bash
bun remove prettier
```

#### 6.2 Установка форматера oxfmt

```bash
bun add -D oxfmt
```

#### 6.3 Перенести форматирование с Prettier на oxfmt

```bash
mv .prettierrc .oxfmtrc.jsonc
```

#### 6.3 Внутри добавь ссылку на схему oxfmt (это не обязательно, но помогает IDE)

```JSON
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "singleQuote": true,
  "trailingComma": "all"
}

```

#### 6.4 Настроить скрипты Bun + Oxc в package.json

```JSON
    "format": "oxfmt .",
    "format:check": "oxfmt --check .",
```

### 7 Настроика расширения для vscode

#### 7.1 Ставим само расширение

https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode

#### 7.2 Настройка рабочей среды

Oxc сейчас в принципе не умеет форматировать JSON / JSON with Comments, только JS/TS, поэтому VS Code и показывает тебе окно «Oxc не может форматировать JSON with Comments». Поэтому для них оставляем Prettier

```json
  "oxc.enable": true,
  "oxc.lint.run": "onType",
  "oxc.fmt.experimental": true,
  "oxc.configPath": ".oxlintrc.json",
  "oxc.fmt.configPath": ".oxfmtrc.jsonc",
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "typescript.format.enable": false,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

```

Cейчас type‑aware работает только в CLI (oxlint --type-aware), а редактор видит только те правила, которые не требуют типовой информации.

### 8 Удаляем не нужные зависимости

#### 8.1 Node‑специфичные TS‑раннеры и загрузчики

- ts-node — Bun уже делает то, что раньше делал ts-node (прямой запуск .ts).​
- ts-loader — нужен только, если ты собираешь через webpack; в современном Nest + Bun он не используется.
- tsconfig-paths — Bun понимает compilerOptions.paths сам, без отдельного модуля.​

```bash
bun remove ts-node ts-loader tsconfig-paths
```

#### 8.2 ESLint / Prettier‑обвязка

```bash
bun remove @eslint/eslintrc eslint-config-prettier
```

#### 8.3 source-map-support

Bun по умолчанию отдаёт нормальные stack‑trace по TS/JS и поддерживает source map без этого пакета.

```bash
bun remove source-map-support
```

### 9 Меняем остальные скрипты чтобы они запускались через Bun

```json
 "scripts": {
    "build": "bunx --bun @nestjs/cli build",
    "start": "bun src/main.ts",
    "start:dev": "bun --hot src/main.ts",
    "start:debug": "bun --inspect --hot src/main.ts",
    "start:prod": "bun dist/main.js",
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:cov": "bun test --coverage",
    "test:debug": "bun --inspect-brk node_modules/.bin/bun-test",
    "test:e2e": "bun test test/**/*.e2e-spec.ts"
  },
```
