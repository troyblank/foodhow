var baseUI = {
    initialize: function() {
        baseUI.listSearch();
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
            var re = new RegExp(val, 'g');
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

        function clearShortList(){
            cleared = true;
            shortList = {};
        }

        //-----------------------------------------------------------------------------------------
        //HANDLERS
        //-----------------------------------------------------------------------------------------
        function inputChangeHand() {
            var val = $(this).val();
            if(val.length > 0){
                filterList(val);
            }else{
                clearShortList();
                $('section.list > a').show();
            }
        }

        function keypressHand(e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                $(this).blur();
            }else if(code == 8){
                //backspace - partial search clear need to reevaluate search.
                EventDispatcher.dispatchEvent(EventDispatcher.ON_SEARCH_CLEAR);
            }
        }

        function searchClearHand(){
            clearShortList();
        }

        initialize();
    }
}

$(document).ready(baseUI.initialize);