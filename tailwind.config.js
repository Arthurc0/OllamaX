import plugin from 'tailwindcss/plugin';

export default {
    theme: {
        colors: {
            'purple': 'rgb(var(--color-purple))',
            'gray': 'rgb(var(--color-gray))',
            'light-gray': 'rgb(var(--color-light-gray))',
            'light-blue': 'rgb(var(--color-light-blue))',
            'white': 'rgb(var(--color-white))',
            'red': 'rgb(var(--color-red))',
            'green': 'rgb(var(--color-green))'
        },
        transitionDuration: {
            '200': '200ms'
        },
        zIndex: {
            'alert': '400',
            'modal': '201',
            'modal-overlay': '200',
            'chat-title': '2',
            'user-profile': '2'
        },
        extend: {
            boxShadow: {
                'around': 'rgba(0, 0, 0, 0.1) 0px 3px 20px 5px'
            }
        }
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('hocus', ['&:hover', '&:focus'])
        })
    ]
}
