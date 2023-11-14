import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: true,
    typescript: {
        strict: true,
        typeCheck: true
    },
    alias: {
        '@': './',
        '#components': './.nuxt/components.d.ts'
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ]
});
