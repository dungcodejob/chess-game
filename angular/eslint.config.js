// @ts-check
const eslint = require("@eslint/js");
const tsEslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintConfigPrettier  = require("eslint-config-prettier");
const eslintPluginPrettierRecommended  = require("eslint-plugin-prettier/recommended");

module.exports = tsEslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
      eslintConfigPrettier

    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  // {
  //   files: ["**/*.html"],
  //   extends: [
  //     ...angular.configs.templateRecommended,
  //     ...angular.configs.templateAccessibility,
  //   ],
  //   rules: {},
  // }
);
