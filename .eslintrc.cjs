const extensions = [
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
  ".scss",
  ".less",
  ".md",
];

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:import/typescript", //
  ],
  plugins: ["import", "css-modules"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "vue/multi-word-component-names": "off",
    "object-shorthand": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
          "object",
        ],
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "import/newline-after-import": ["warn", { count: 1 }], // import 后空一行
  },
  settings: {
    "import/resolver": {
      node: {
        extensions,
      },
      alias: {
        "@": "./src",
      },
    },
  },
};
