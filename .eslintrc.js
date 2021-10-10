const importResolverSettings = {
    'import/resolver': {
        typescript: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
    },
};

const eslintRules = {
    'no-console': 'warn',
    'no-void': 'off',
    'import/order': [
        'error',
        { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] },
    ],
    'import/no-unresolved': 'off',
    'jsx-a11y/label-has-associated-control': [
        'error',
        {
            required: {
                some: ['nesting', 'id'],
            },
        },
    ],
    'jsx-a11y/label-has-for': [
        'error',
        {
            required: {
                some: ['nesting', 'id'],
            },
        },
    ],
};

const prettierRules = {
    'prettier/prettier': [
        'error',
        {
            trailingComma: 'es5',
            singleQuote: true,
            printWidth: 100,
            endOfLine: 'auto',
            arrowParens: 'avoid',
            tabWidth: 4,
        },
    ],
};

module.exports = {
    extends: ['wesbos'],
    rules: { ...eslintRules, ...prettierRules },
    settings: { ...importResolverSettings },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: `@typescript-eslint/parser`,
            parserOptions: {
                project: './tsconfig.json',
            },
            extends: [
                'wesbos',
                'eslint:recommended',
                'plugin:import/typescript',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            plugins: ['@typescript-eslint'],
            rules: {
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': ['error'],
                'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
                ...eslintRules,
                ...prettierRules,
            },
            settings: { ...importResolverSettings },
        },
    ],
};
