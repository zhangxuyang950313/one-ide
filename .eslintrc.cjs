module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType:'module'
    },
    env: {
        browser: true,
        es6: true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production'? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production'? 'warn' : 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'vue/multi-word-component-names': 'off'
    }
}