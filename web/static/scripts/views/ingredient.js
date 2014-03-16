var IngredientView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options || {};
		var template = _.template('<li data-id="<%= id %>"><%= title %></li>');
		var html = template({
			id: this.options.id,
			title: this.options.title
		});
		this.setElement(html);
	},

	render: function() {
		return this;
	}
});