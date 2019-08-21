const withSass = require('@zeit/next-sass')
const list = require('./static/recipes.json');

const { recipes } = list;
const recipePaths = {};
recipes.forEach((r) => {
    recipePaths[`/recipe/${r.replace(/ /g, '_')}`] = {page: '/recipe/[recipe]'}
});

module.exports = withSass({
    exportPathMap: () => ({
        '/': { page: '/' },
        '/guide': { page: '/guide' },
        '/shoppingList': { page: '/shoppingList' },
        ...recipePaths
    })
});
