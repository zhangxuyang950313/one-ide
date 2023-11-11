module.exports = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.vue'],
            options: {
                parser: 'vue'
            }
        },
        {
            files: [
                '*.js',
                '*.jsx',
                '*.mjs',
                '*.cjs',
                '*.ts',
                '*.tsx',
                '*.vue'
            ],
            options: {
                parser: 'babel'
            }
        }
    ]
}
