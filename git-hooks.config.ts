const config = {
  'pre-commit': {
    stagedLint: {
      '*.{js,jsx,ts,tsx,mjs,cjs}': ['bun lint:fix', 'bun format'],
      '*.{json,md,yml,yaml}': 'prettier --write',
      '*.{css,scss,html}': 'prettier --write',
    },
  },

  'commit-msg':
    'bun scripts/verify-commit.ts $1 && bunx --no -- commitlint --edit $1',
  verbose: true,
};

export default config;
