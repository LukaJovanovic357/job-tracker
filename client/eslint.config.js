import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    languageOptions: {
        globals: globals.browser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsparser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            },
            tsconfigRootDir: __dirname,
            project: ['./tsconfig.json']
        }
    },
    plugins: {
        '@typescript-eslint': fixupPluginRules(tseslint),
        react: fixupPluginRules(pluginReact),
        prettier: fixupPluginRules(pluginPrettier),
        import: fixupPluginRules(pluginImport)
    },
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false
            }
        ],
        '@typescript-eslint/no-unused-vars': ['error'],
        'react/prop-types': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            }
        }
    },
    linterOptions: {
        reportUnusedDisableDirectives: true
    }
};
