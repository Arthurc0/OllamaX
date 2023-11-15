export default defineNuxtConfig({
    devtools: { enabled: true },
    typescript: {
        strict: true,
        typeCheck: true
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    app: {
        pageTransition: {
            appear: true,
            mode: 'out-in',
            name: 'page'
        }
    }
});
