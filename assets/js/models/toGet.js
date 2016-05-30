var ToGet = Backbone.Model.extend({
    defaults: {
        'title': '',
        'recipe': '',
        'checked': false
    },

    toggle: function() {
        this.save({
            checked: !this.get('checked')
        });
    }
});

export { ToGet }