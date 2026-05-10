export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['upper-case']],
    'body-max-line-length': [1, 'always', 120],
  },
  'type-enum':[
    2,
    'always',
    [
        'ci',        // Continuous Integration configuration and pipeline changes
        'test',      // Adding or updating tests
        'build',     // Build system and dependencies changes
        'chore',     // Maintenance tasks and routine updates
        'docs',      // Documentation updates
        'ticket',    // Changes related to a specific ticket/issue
        'release',   // Release version changes
        'feat',      // New feature implementation
        'fix',       // Bug fix
        'hot-fix',   // Critical production bug fix
        'perf',      // Performance improvements
        'refactor',  // Code refactoring without feature or bug changes
        'revert',    // Reverting previous commits
        'style'      // Code style changes (formatting, semicolons, etc)
    ]
  ],
};
