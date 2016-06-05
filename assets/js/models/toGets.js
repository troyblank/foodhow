import { ToGet } from './toGet';

const ToGets = Backbone.Collection.extend({
    model: ToGet,
    localStorage: new Backbone.LocalStorage('ingredients')
});

export { ToGets };
