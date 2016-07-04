module.exports = {
    dev: {
        files: {
            'web/static/scripts/base.min.js': [
                'web/static/scripts/lib/underscore.js',
                'web/static/scripts/lib/backbone-min.js',
                'web/static/scripts/lib/backbone.localStorage.js',
                'web/static/scripts/lib/EventDispatcher.js',
                'web/static/scripts/models/toGet.js',
                'web/static/scripts/models/toGets.js',
                'web/static/scripts/views/ingredient.js',
                'web/static/scripts/baseUI.js'
            ],
            'web/static/scripts/shoppingList.min.js': [
                'web/static/scripts/shoppingListUI.js'
            ]
        }
    },
    prod: {
        files: {
            'web/static/scripts/base.min.js': [
                'web/static/scripts/lib/underscore.js',
                'web/static/scripts/lib/backbone-min.js',
                'web/static/scripts/lib/backbone.localStorage.js',
                'web/static/scripts/lib/EventDispatcher.js',
                'web/static/scripts/models/toGet.js',
                'web/static/scripts/models/toGets.js',
                'web/static/scripts/views/ingredient.js',
                'web/static/scripts/baseUI.js'
            ],
            'web/static/scripts/shoppingList.min.js': [
                'web/static/scripts/shoppingListUI.js'
            ]
        }
    }
};
