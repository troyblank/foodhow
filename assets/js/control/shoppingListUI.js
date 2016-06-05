import $ from 'jquery';
import { ToGets } from '../models/toGets';
import { IngredientView } from '../views/ingredient';

const shoppingListUI = {

    ingredients: new ToGets(),

    initialize() {
        if (0 < $('#shopping-list').length) {
            shoppingListUI.ingredients.fetch();
            shoppingListUI.printIngredients();
            shoppingListUI.addListeners();
        }
    },

    refreshListeners() {
        shoppingListUI.removeListeners();
        shoppingListUI.addListeners();
    },

    removeListeners() {
        $('#shopping-list .unchecked li').off('click', shoppingListUI.uncheckClickHand);
        $('#shopping-list .checked li').off('click', shoppingListUI.checkedClickHand);
        $('#clear-btn').off('click', shoppingListUI.clearHand);
    },

    addListeners() {
        $('#shopping-list .unchecked li').on('click', shoppingListUI.uncheckClickHand);
        $('#shopping-list .checked li').on('click', shoppingListUI.checkedClickHand);
        $('#clear-btn').on('click', shoppingListUI.clearHand);
    },

    clearAllChecked() {
        let i = $('#shopping-list .checked li').length - 1;
        while (0 <= i) {
            const ele = $('#shopping-list .checked li')[i];
            const ingredient = shoppingListUI.ingredients.get($(ele).attr('data-id'));
            ingredient.destroy();
            i--;
        }

        $('#clear-btn').hide();
        $('#shopping-list .checked').empty();

        if (0 === $('#shopping-list .unchecked li').length) {
            shoppingListUI.appendDoneList();
        }
    },

    //--------------------------------------------------------------------------------------------------
    // VIEW
    //--------------------------------------------------------------------------------------------------

    printIngredients() {
        const frag = document.createDocumentFragment();

        if (0 < shoppingListUI.ingredients.length) {
            const unchecked = shoppingListUI.ingredients.where({
                checked: false
            });
            const checked = shoppingListUI.ingredients.where({
                checked: true
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

    makeIngredientList(list, className) {
        const ul = document.createElement('ul');
        let i = 0;

        ul.className = className;

        for (i; i < list.length; i++) {
            const tg = list[i];
            const view = new IngredientView({
                id: tg.cid,
                title: tg.get('title')
            });
            ul.appendChild(view.render().el);
        }

        return ul;
    },

    appendEmptyList(frag) {
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        h1.innerHTML = 'This list is empty';
        p.innerHTML = 'There is no ingredients on your list, browser some recipes and select some ingredients to add some.';
        frag.appendChild(h1);
        frag.appendChild(p);
    },

    appendDoneList() {
        const frag = document.createDocumentFragment();
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        h1.innerHTML = 'Done!';
        p.innerHTML = 'Oh, so proud of you!';
        frag.appendChild(h1);
        frag.appendChild(p);
        $('#shopping-list').html(frag);
    },

    makeClearAllButton() {
        const button = document.createElement('button');
        button.id = 'clear-btn';
        button.innerHTML = 'Clear Checked';
        return button;
    },

    updateClearAllButton() {
        if (0 < !$('#shopping-list .checked li').length) {
            $('#clear-btn').hide();
        } else {
            $('#clear-btn').show();
        }
    },

    //--------------------------------------------------------------------------------------------------
    // HANDLERS
    //--------------------------------------------------------------------------------------------------
    uncheckClickHand() {
        const ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
        ingredient.set('checked', true);
        ingredient.save();

        $(this).prependTo('.checked');
        shoppingListUI.updateClearAllButton();
        shoppingListUI.refreshListeners();
    },

    checkedClickHand() {
        const ingredient = shoppingListUI.ingredients.get($(this).attr('data-id'));
        ingredient.set('checked', false);
        ingredient.save();

        $(this).prependTo('.unchecked');
        shoppingListUI.updateClearAllButton();
        shoppingListUI.refreshListeners();
    },

    clearHand() {
        shoppingListUI.clearAllChecked();
    }
};

$(document).ready(shoppingListUI.initialize);
