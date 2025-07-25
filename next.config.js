module.exports = {
    eslint: {
        ignoreDuringBuilds: true
    },
    exportPathMap: () => ({
        '/': { page: '/' },
        '/guide': { page: '/guide' },
        '/shoppingList': { page: '/shoppingList' }
    }),
    reactStrictMode: true
};
