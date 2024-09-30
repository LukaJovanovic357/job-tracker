import { loadEnvFile } from 'process';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: 'dotenv/config',
        coverage: {
            reporter: ['text', 'json', 'html'],
            provider: 'v8',
            include: ['**/src/**/*.ts'],
            exclude: ['**/src/database/**', '**/src/entities/**']
        }
    }
});
