var IngredientView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options || {};
		var template = _.template('<li><%= title %></li>');
		var html = template({
			title: this.options.title
		});
		this.setElement(html);
	},

	render: function() {
		return this;
	}
});