import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: resolve(__dirname, './dist-vite/'),
    build: {
        outDir: resolve(__dirname, './dist-vite/'),
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
