var shoppingListUI = {

	ingredients: new ToGets(),

	initialize: function() {
		shoppingListUI.ingredients.fetch();
		shoppingListUI.printIngredients();
	},

	printIngredients: function() {
		var frag = document.createDocumentFragment();

		if (shoppingListUI.ingredients.length > 0) {
			var ul = document.createElement('ul');
			shoppingListUI.ingredients.each(function(tg) {
				var view = new IngredientView({
					'title': tg.get('title')
				});
				ul.appendChild(view.render().el);
			});
			frag.appendChild(ul);
		} else {
			//show empty list notification
			var h1 = document.createElement('h1');
			var p = document.createElement('p');
			h1.innerHTML = 'This list is empty';
			p.innerHTML = 'There is no ingredients on your list, browser some recipes and select some ingredients to add some.';
			frag.appendChild(h1);
			frag.appendChild(p);
		}

		$('#shopping-list').html(frag);
	}
}

$(document).ready(shoppingListUI.initialize);