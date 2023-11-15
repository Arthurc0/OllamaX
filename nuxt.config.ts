export default defineNuxtConfig({
    devtools: { enabled: true },
    typescript: {
        strict: true,
        typeCheck: true
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ]
});
