import plugin from 'tailwindcss/plugin';

export default {
    theme: {
        colors: {
            'purple': 'rgb(var(--color-purple))',
            'gray': 'rgb(var(--color-gray))',
            'light-gray': 'rgb(var(--color-light-gray))',
            'light-blue': 'rgb(var(--color-light-blue))',
            'white': 'rgb(var(--color-white))'
        },
        transitionDuration: {
            '200': '200ms'
        },
        zIndex: {
            'alert': '400',
            'modal': '300',
            'modal-overlay': '200',
            'user-profile': '2'
        }
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('hocus', ['&:hover', '&:focus'])
        })
    ]
}
