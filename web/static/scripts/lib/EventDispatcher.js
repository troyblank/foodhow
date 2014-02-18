var EventDispatcher = {
    eventDispatcher:new Object(),
    ON_SEARCH_CLEAR:'onSearchClear',

    init:function(){
        //
    },

    //---------------------------------------------------------------------------------------------
    //PUBLIC
    //---------------------------------------------------------------------------------------------

    addEventListener:function(type, handler){
        if(EventDispatcher.eventDispatcher[type] == undefined){
            EventDispatcher.eventDispatcher[type] = new Array();
        }
        EventDispatcher.eventDispatcher[type].push(handler);
    },

    removeEventListener:function(type, handler){
        var i = EventDispatcher.eventDispatcher[type].length-1;
        while(i >= 0){
            if(EventDispatcher.eventDispatcher[type][i] == handler){
                EventDispatcher.eventDispatcher[type].splice(i, 1);
                return;
            }
            i--;
        }
    },

    dispatchEvent:function(type, data){
        if(EventDispatcher.eventDispatcher[type] != undefined){
            var callList = EventDispatcher.eventDispatcher[type].slice(0);
            for(var i = 0; i<callList.length; i++){
                callList[i].apply(this, [data]);
            }
        }
    }
}

$(document).ready(EventDispatcher.init);