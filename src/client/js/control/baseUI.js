import $ from 'jquery';
import EventDispatcher from '../lib/EventDispatcher';
import store from '../store';
import { addIngredient as addIngredientAction, removeIngredient as removeIngredientAction } from '../actions/index';

const baseUI = {
    initialize() {
        baseUI.listSearch();
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
            if (ingredients.find(ingredient => ingredient.name === title && ingredient.recipe === recipe)) {
                return true;
            }

            return false;
        }

        function stageSetIngredientList() {
            const ingredients = store.getState().ingredients;
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
    },
    //-----------------------------------------------------------------------------------------
    // LIST SEARCH
    //-----------------------------------------------------------------------------------------
    listSearch() {
        const list = {};
        let shortList = {}; // used on iterations of list to improve performance
        let cleared = true;

        function clearShortList() {
            cleared = true;
            shortList = {};
        }

        function filterList(val) {
            const re = new RegExp(val, 'gi');
            const evalist = cleared ? list : shortList;

            for (const prop of Object.keys(evalist)) {
                if (null === prop.match(re)) {
                    $(evalist[prop]).hide();
                    delete shortList[prop];
                } else {
                    shortList[prop] = list[prop];
                    $(evalist[prop]).show();
                    cleared = false;
                }
            }
        }

        function generateSearchList() {
            $('section.list a').each((i, ele) => {
                list[$(ele).html()] = ele;
            });
        }

        //-----------------------------------------------------------------------------------------
        // HANDLERS
        //-----------------------------------------------------------------------------------------
        function inputChangeHand() {
            const val = $(this).val();
            if (0 < val.length) {
                filterList(val);
            } else {
                clearShortList();
                $('section.list > a').show();
            }
        }

        function keypressHand(e) {
            const code = e.keyCode || e.which;
            if (13 === code) {
                $(this).blur();
            } else if (8 === code) {
                // backspace - partial search clear need to reevaluate search.
                EventDispatcher.dispatchEvent(EventDispatcher.ON_SEARCH_CLEAR);
            }
        }

        function searchClearHand() {
            clearShortList();
        }

        //-----------------------------------------------------------------------------------------

        function addListeners() {
            $('input[name=search]').on('input', inputChangeHand);
            $('input[name=search]').on('keydown', keypressHand);

            EventDispatcher.addEventListener(EventDispatcher.ON_SEARCH_CLEAR, searchClearHand);
        }

        function initialize() {
            $('input[name=search]').val('');

            generateSearchList();
            addListeners();
        }

        initialize();
    }
};

$(document).ready(baseUI.initialize);
