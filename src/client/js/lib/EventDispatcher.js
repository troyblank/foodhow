const EventDispatcher = {
    eventDispatcher: {},
    ON_SEARCH_CLEAR: 'onSearchClear',

    //---------------------------------------------------------------------------------------------
    // PUBLIC
    //---------------------------------------------------------------------------------------------

    addEventListener(type, handler) {
        if (EventDispatcher.eventDispatcher[type] === undefined) {
            EventDispatcher.eventDispatcher[type] = [];
        }
        EventDispatcher.eventDispatcher[type].push(handler);
    },

    removeEventListener(type, handler) {
        let i = EventDispatcher.eventDispatcher[type].length - 1;

        while (0 <= i) {
            if (EventDispatcher.eventDispatcher[type][i] === handler) {
                EventDispatcher.eventDispatcher[type].splice(i, 1);
                return;
            }
            i -= 1;
        }
    },

    dispatchEvent(type, data) {
        let i = 0;

        if (EventDispatcher.eventDispatcher[type] !== undefined) {
            const callList = EventDispatcher.eventDispatcher[type].slice(0);
            for (i; i < callList.length; i += 1) {
                callList[i].apply(this, [data]);
            }
        }
    }
};

module.exports = EventDispatcher;
