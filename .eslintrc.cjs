/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  globals: {
    CONFIG: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier", // enable prettier
    "plugin:import/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import"],
  rules: {
    "vue/multi-word-component-names": "off",
    "object-shorthand": "warn",
    "prefer-template": "warn", // 使用模板字符串
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "no-duplicate-imports": "warn", // 禁止重复导入
    "no-useless-concat": "error", // 禁止没必要的字符串拼接
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "import/newline-after-import": ["warn", { count: 1 }], // import 后空一行
    "import/no-cycle": "error",
    "import/default": "off",
    "import/named": "off",
    "import/no-unresolved": ["error", { ignore: ["\\?raw$"] }],
    "import/order": [
      "warn",
      {
        groups: [
          "external", // 外部模块
          "builtin", // 内置模块
          "internal", // 内部引用
          "sibling", // 兄弟依赖
          "parent", // 父节点依赖
          "index", // 文件依赖
          "unknown", // 未知依赖
        ],
        pathGroups: [
          {
            pattern: "node:*",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/api|store|use|utils/*",
            group: "sibling",
            position: "before",
          },
          {
            pattern: "@/components/**/*",
            group: "sibling",
            position: "after",
          },
        ],
        "newlines-between": "never",
      },
    ],
  },
  settings: {
    "no-debugger": "warn",
    "import/extensions": [".js", ".js", ".ts", ".tsx", ".vue"],
    "import/resolver": {
      // typescript: true,
      node: true,
      alias: {
        // eslint-disable-next-line no-undef
        map: [["@", require("path").resolve("./src")]],
        extensions: [".js", ".js", ".ts", ".tsx", ".vue"],
      },
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
