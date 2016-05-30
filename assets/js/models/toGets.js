import { ToGet } from './toGet';

var ToGets = Backbone.Collection.extend({
    model: ToGet,
    localStorage: new Backbone.LocalStorage('ingredients')
});

export { ToGets }