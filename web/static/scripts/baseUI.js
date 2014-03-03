var baseUI = {
    initialize: function() {
        baseUI.listSearch();
        baseUI.groceryList();
    },
    //-----------------------------------------------------------------------------------------
    //LIST SEARCH
    //-----------------------------------------------------------------------------------------
    groceryList: function() {

        var ingredients = new ToGets();

        function initialize() {
            ingredients.fetch();

            stageSetIngredientList();
            addListeners();
        }

        function addListeners() {
            $('.ingredients li').on('click', ingredientAddHand);
        }

        function stageSetIngredientList() {
            var recipe = $('.recipe header h1').html();
            $('.ingredients li').each(function(i, ele) {
                var title = $(ele).html();
                if (isIngredientInList(recipe, title)) {
                    $(ele).addClass('active');
                }

            });
        }

        function isIngredientInList(recipe, title) {
            var match = ingredients.where({
                'recipe': recipe,
                'title': title
            });

            if (match.length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function addIngredient(recipe, title) {
            var match = ingredients.where({
                'recipe': recipe,
                'title': title
            });

            if (match.length == 0) {
                ingredients.create({
                    'recipe': recipe,
                    'title': title
                });
            }
        }

        function removeIngredient(recipe, title) {
            var match = ingredients.where({
                'recipe': recipe,
                'title': title
            });

            var i = match.length - 1;
            while (i >= 0) {
                match[i].destroy();
                i--;
            }
        }

        //-----------------------------------------------------------------------------------------
        //HANDLERS
        //-----------------------------------------------------------------------------------------
        function ingredientAddHand() {
            var recipe = $('.recipe header h1').html();
            var title = $(this).html();

            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                addIngredient(recipe, title);
            } else {
                $(this).removeClass('active');
                removeIngredient(recipe, title);
            }
        }

        if ($('section.recipe').length > 0) {
            initialize();
        }
    },
    //-----------------------------------------------------------------------------------------
    //LIST SEARCH
    //-----------------------------------------------------------------------------------------
    listSearch: function() {
        var list = {};
        var shortList = {}; //used on iterations of list to improve performance
        var cleared = true;

        function initialize() {
            $('input[name=search]').val('');

            generateSearchList();
            addListeners();
        }

        function addListeners() {
            $('input[name=search]').on('input', inputChangeHand);
            $('input[name=search]').on('keydown', keypressHand);

            EventDispatcher.addEventListener(EventDispatcher.ON_SEARCH_CLEAR, searchClearHand);
        }

        function generateSearchList() {
            $('section.list a').each(function(i, ele) {
                list[$(ele).html()] = ele;
            });
        }

        function filterList(val) {
            var re = new RegExp(val, 'gi');
            var evalist = cleared ? list : shortList;
            for (var prop in evalist) {
                if (prop.match(re) === null) {
                    $(evalist[prop]).hide();
                    delete shortList[prop];
                } else {
                    shortList[prop] = list[prop];
                    $(evalist[prop]).show();
                    cleared = false;
                }
            }
        }

        function clearShortList() {
            cleared = true;
            shortList = {};
        }

        //-----------------------------------------------------------------------------------------
        //HANDLERS
        //-----------------------------------------------------------------------------------------
        function inputChangeHand() {
            var val = $(this).val();
            if (val.length > 0) {
                filterList(val);
            } else {
                clearShortList();
                $('section.list > a').show();
            }
        }

        function keypressHand(e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                $(this).blur();
            } else if (code == 8) {
                //backspace - partial search clear need to reevaluate search.
                EventDispatcher.dispatchEvent(EventDispatcher.ON_SEARCH_CLEAR);
            }
        }

        function searchClearHand() {
            clearShortList();
        }

        initialize();
    }
}

$(document).ready(baseUI.initialize);