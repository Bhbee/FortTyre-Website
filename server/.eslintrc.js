module.exports ={
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin/@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:pretier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parseOptions:{
        ecmaVersion: 2016,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
};