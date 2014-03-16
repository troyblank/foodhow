var shoppingListUI = {

	ingredients: new ToGets(),

	initialize: function() {
		shoppingListUI.ingredients.fetch();
		shoppingListUI.printIngredients();
		shoppingListUI.addListeners();
	},

	refreshListeners: function() {
		shoppingListUI.removeListeners();
		shoppingListUI.addListeners();
	},

	removeListeners: function() {
		$('#shopping-list .unchecked li').off('click', shoppingListUI.uncheckClickHand);
		$('#shopping-list .checked li').off('click', shoppingListUI.checkedClickHand);
	},

	addListeners: function() {
		$('#shopping-list .unchecked li').on('click', shoppingListUI.uncheckClickHand);
		$('#shopping-list .checked li').on('click', shoppingListUI.checkedClickHand);
	},

	//--------------------------------------------------------------------------------------------------
	//VIEW
	//--------------------------------------------------------------------------------------------------
	printIngredients: function() {
		var frag = document.createDocumentFragment();

		if (shoppingListUI.ingredients.length > 0) {
			var unchecked = shoppingListUI.ingredients.where({
				'checked': false
			});
			var checked = shoppingListUI.ingredients.where({
				'checked': true
			});

			frag.appendChild(shoppingListUI.appendIngredientList(unchecked, 'unchecked'));
			frag.appendChild(shoppingListUI.appendIngredientList(checked, 'checked'));

		} else {
			shoppingListUI.appendEmptyList(frag);
		}

		$('#shopping-list').html(frag);
	},

	appendIngredientList: function(list, className) {
		var ul = document.createElement('ul');
		ul.className = className;

		for (var i = 0; i < list.length; i++) {
			var tg = list[i];
			var view = new IngredientView({
				'id': tg.cid,
				'title': tg.get('title')
			});
			ul.appendChild(view.render().el);
		}

		return ul;
	},

	appendEmptyList: function(frag) {
		var h1 = document.createElement('h1');
		var p = document.createElement('p');
		h1.innerHTML = 'This list is empty';
		p.innerHTML = 'There is no ingredients on your list, browser some recipes and select some ingredients to add some.';
		frag.appendChild(h1);
		frag.appendChild(p);
	},
	//--------------------------------------------------------------------------------------------------
	//HANDLERS
	//--------------------------------------------------------------------------------------------------
	uncheckClickHand: function() {
		var ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
		ingredient.set('checked', true);
		ingredient.save();

		$(this).prependTo('.checked');
		shoppingListUI.refreshListeners();
	},
	checkedClickHand: function() {
		var ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
		ingredient.set('checked', false);
		ingredient.save();

		$(this).prependTo('.unchecked');
		shoppingListUI.refreshListeners();
	}
}

$(document).ready(shoppingListUI.initialize);