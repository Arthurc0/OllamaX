import plugin from 'tailwindcss/plugin';

export default {
    theme: {
        colors: {
            'purple': 'rgb(var(--color-purple))',
            'gray': 'rgb(var(--color-gray))',
            'light-blue': 'rgb(var(--color-light-blue))'
        },
        transitionDuration: {
            '200': '200ms'
        }
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('hocus', ['&:hover', '&:focus'])
        })
    ]
}
