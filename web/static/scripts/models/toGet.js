var toGet = Backbone.Model.extend({
    defaults: {
        'title': '',
        'recipe': '',
        'checked': false
    },

    toggle: function() {
        //this.save({done: !this.get("done")});
    }
});