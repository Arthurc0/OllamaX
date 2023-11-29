export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    typescript: {
        strict: true,
        typeCheck: true
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/image'
    ],
    app: {
        pageTransition: {
            appear: true,
            mode: 'out-in',
            name: 'page'
        }
    },
    imports: {
        dirs: [
            'composables/**',
            'stores/**',
            'utils/**'
        ]
    }
});
