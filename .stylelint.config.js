module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreRules: [
          'tailwind',
          'apply'
        ]
      }
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  }
}
