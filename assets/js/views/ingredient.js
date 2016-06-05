import _ from 'underscore';

const IngredientView = Backbone.View.extend({
    initialize(options) {
        const template = _.template('<li data-id="<%= id %>"><%= title %></li>');

        this.options = options || {};
        const html = template({
            id: this.options.id,
            title: this.options.title
        });

        this.setElement(html);
    },

    render() {
        return this;
    }
});

export { IngredientView };
