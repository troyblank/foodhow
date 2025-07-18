module.exports = {
	eslint: {
		ignoreDuringBuilds: true,
	},
    exportPathMap: () => ({
        '/': { page: '/' },
        '/guide': { page: '/guide' },
        '/shoppingList': { page: '/shoppingList' },
    }),
    output: 'export',
    reactStrictMode: true,
}
