module.exports = {
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-recommended', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
}
