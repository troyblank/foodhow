import $ from 'jquery';
import { ToGets } from '../models/toGets';
import { IngredientView } from '../views/ingredient';

var shoppingListUI = {

	ingredients: new ToGets(),

	initialize: function() {
		if($('#shopping-list').length > 0){
			shoppingListUI.ingredients.fetch();
			shoppingListUI.printIngredients();
			shoppingListUI.addListeners();
		}
	},

	refreshListeners: function() {
		shoppingListUI.removeListeners();
		shoppingListUI.addListeners();
	},

	removeListeners: function() {
		$('#shopping-list .unchecked li').off('click', shoppingListUI.uncheckClickHand);
		$('#shopping-list .checked li').off('click', shoppingListUI.checkedClickHand);
		$('#clear-btn').off('click', shoppingListUI.clearHand);
	},

	addListeners: function() {
		$('#shopping-list .unchecked li').on('click', shoppingListUI.uncheckClickHand);
		$('#shopping-list .checked li').on('click', shoppingListUI.checkedClickHand);
		$('#clear-btn').on('click', shoppingListUI.clearHand);
	},

	clearAllChecked: function() {
		var i = $('#shopping-list .checked li').length - 1;
		while (i >= 0) {
			var ele = $('#shopping-list .checked li')[i];
			var ingredient = shoppingListUI.ingredients.get($(ele).attr('data-id'));
			ingredient.destroy();
			i--;
		}

		$('#clear-btn').hide();
		$('#shopping-list .checked').empty();

		if ($('#shopping-list .unchecked li').length == 0) {
			shoppingListUI.appendDoneList();
		}
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

			frag.appendChild(shoppingListUI.makeIngredientList(unchecked, 'unchecked'));
			frag.appendChild(shoppingListUI.makeClearAllButton());
			frag.appendChild(shoppingListUI.makeIngredientList(checked, 'checked'));
		} else {
			shoppingListUI.appendEmptyList(frag);
		}

		$('#shopping-list').html(frag);
		shoppingListUI.updateClearAllButton();
	},

	makeIngredientList: function(list, className) {
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

	appendDoneList: function() {
		var frag = document.createDocumentFragment();
		var h1 = document.createElement('h1');
		var p = document.createElement('p');
		h1.innerHTML = 'Done!';
		p.innerHTML = 'Oh, so proud of you!';
		frag.appendChild(h1);
		frag.appendChild(p);
		$('#shopping-list').html(frag);
	},

	makeClearAllButton: function() {
		var button = document.createElement('button');
		button.id = 'clear-btn';
		button.innerHTML = 'Clear Checked';
		return button;
	},

	updateClearAllButton: function() {
		if (!$('#shopping-list .checked li').length > 0) {
			$('#clear-btn').hide();
		} else {
			$('#clear-btn').show();
		}
	},
	//--------------------------------------------------------------------------------------------------
	//HANDLERS
	//--------------------------------------------------------------------------------------------------
	uncheckClickHand: function() {
		var ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
		ingredient.set('checked', true);
		ingredient.save();

		$(this).prependTo('.checked');
		shoppingListUI.updateClearAllButton();
		shoppingListUI.refreshListeners();
	},
	checkedClickHand: function() {
		var ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
		ingredient.set('checked', false);
		ingredient.save();

		$(this).prependTo('.unchecked');
		shoppingListUI.updateClearAllButton();
		shoppingListUI.refreshListeners();
	},
	clearHand: function() {
		shoppingListUI.clearAllChecked();
	}
}

$(document).ready(shoppingListUI.initialize);