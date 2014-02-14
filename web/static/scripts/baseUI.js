var baseUI = {
    initialize: function() {
        baseUI.listSearch();
    },
    //-----------------------------------------------------------------------------------------
    //LIST SEARCH
    //-----------------------------------------------------------------------------------------
    listSearch: function() {
        var list = {};

        function initialize() {
            $('input[name=search]').val('');

            generateSearchList();
            addListeners();
        }

        function addListeners() {
            $('input[name=search]').on('input', inputChangeHand);
            $('input[name=search]').on('keydown', keypressHand);
        }

        function generateSearchList() {
            $('section.list a').each(function(i, ele) {
                list[$(ele).html()] = ele;
            });
        }

        function inputChangeHand() {
            filterList($(this).val());
        }

        function keypressHand(e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                $(this).blur();
            }
        }

        function filterList(val) {
            var re = new RegExp(val, 'g');
            for (var prop in list) {
                if (prop.match(re) === null) {
                    $(list[prop]).hide();
                } else {
                    $(list[prop]).show();
                }
            }
        }

        initialize();
    }
}

$(document).ready(baseUI.initialize);