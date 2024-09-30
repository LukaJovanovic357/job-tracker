import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom',
        exclude: ['./tests/playwright/**/*']
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
            features: path.resolve(__dirname, 'src/features'),
            components: path.resolve(__dirname, 'src/components'),
            pages: path.resolve(__dirname, 'src/pages')
        }
    }
});
