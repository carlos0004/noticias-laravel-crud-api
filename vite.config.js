import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/js/admin/autor.js', 'resources/js/admin/categoria.js', 'resources/js/admin/admin.js'],
            refresh: true,
        }),
    ],
});
