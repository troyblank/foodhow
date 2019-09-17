import $ from 'jquery';
import store from '../store';
import { addIngredient as addIngredientAction, removeIngredient as removeIngredientAction } from '../actions/index';

const baseUI = {
    initialize() {
        baseUI.groceryList();
    },

    //-----------------------------------------------------------------------------------------
    // LIST SEARCH
    //-----------------------------------------------------------------------------------------

    groceryList() {
        function addIngredient(recipe, title) {
            store.dispatch(addIngredientAction({ name: title, recipe }));
        }

        function removeIngredient(recipe, title) {
            store.dispatch(removeIngredientAction(title, recipe));
        }

        function ingredientAddHand() {
            const recipe = $('.recipe header h1').html();
            const title = $(this).html();

            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                addIngredient(recipe, title);
            } else {
                $(this).removeClass('active');
                removeIngredient(recipe, title);
            }
        }

        function addListeners() {
            $('.ingredients li').on('click', ingredientAddHand);
        }

        function isIngredientInList(ingredients, recipe, title) {
            if (ingredients.find((ingredient) => ingredient.name === title && ingredient.recipe === recipe)) {
                return true;
            }

            return false;
        }

        function stageSetIngredientList() {
            const { ingredients } = store.getState();
            const recipe = $('.recipe header h1').html();

            $('.ingredients li').each((i, ele) => {
                const title = $(ele).html();

                if (isIngredientInList(ingredients, recipe, title)) {
                    $(ele).addClass('active');
                }
            });
        }

        function initialize() {
            stageSetIngredientList();
            addListeners();
        }

        if (0 < $('section.recipe').length) {
            initialize();
        }
    }
};

$(document).ready(baseUI.initialize);
