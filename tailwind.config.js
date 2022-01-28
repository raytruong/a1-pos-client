module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Cera Round Pro'],
                body: ['Sansburg'],
            },
            gridTemplateRows: {
                12: 'repeat(12, minmax(0, 1fr))',
            },
            gridRow: {
                'span-7': 'span 7 / span 7',
                'span-8': 'span 8 / span 8',
                'span-9': 'span 9 / span 9',
                'span-10': 'span 10 / span 10',
                'span-11': 'span 11 / span 11',
                'span-12': 'span 12 / span 12',
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                14: 'repeat(14, minmax(0, 1fr))',
                15: 'repeat(15, minmax(0, 1fr))',
                16: 'repeat(16, minmax(0, 1fr))',
            },
        },
    },
    plugins: [],
};
