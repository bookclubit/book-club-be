module.exports = {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?: (.+) #(\d+)$/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'revert',
      ],
    ],
    'subject-min-length': [2, 'always', 3],
    'header-max-length': [2, 'always', 100],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
