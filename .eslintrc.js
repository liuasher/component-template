// eslint配置
const SETTING = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        sensors: true,
        THREE: true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'linebreak-style': 0,
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};

SETTING.extends = [
    'plugin:vue/essential',
    // '@vue/airbnb',
    '@vue/typescript',
];
SETTING.parserOptions = {
    parser: '@typescript-eslint/parser',
};

module.exports = SETTING;
