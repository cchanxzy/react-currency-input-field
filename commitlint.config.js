module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        // Attribution lines don't belong in commit messages: `Co-authored-by:`
        // trailers in any capitalisation, and "Generated with <tool>" lines,
        // including ones with an emoji or bullet in front.
        'no-attribution': ({ raw }) => {
          const found = /^\W*(co-authored-by:|generated with\b)/im.test(raw ?? '');
          return [
            !found,
            'message must not contain Co-authored-by trailers or "Generated with" lines',
          ];
        },
      },
    },
  ],
  rules: {
    // Scopes are optional, but when used they must come from this list: the
    // library and demo areas, plus `release` for semantic-release commits and
    // `deps`/`deps-dev` for Dependabot commits. Tooling changes use a type
    // (`ci:`, `build:`, `chore:`) without a scope.
    'scope-enum': [
      2,
      'always',
      [
        'component',
        'format-value',
        'clean-value',
        'utils',
        'types',
        'examples',
        'deps',
        'deps-dev',
        'release',
      ],
    ],
    // With the default release preset, a `feat!:` header doesn't match and
    // would publish no release. Breaking changes use a `BREAKING CHANGE:`
    // footer instead.
    'subject-exclamation-mark': [2, 'never'],
    // See the plugin above.
    'no-attribution': [2, 'always'],
  },
};
