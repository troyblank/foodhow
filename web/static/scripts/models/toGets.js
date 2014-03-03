var ToGets = Backbone.Collection.extend({
    model: ToGet,
    localStorage: new Backbone.LocalStorage('ingredients'),

    //need parse if json does not match model, just need array of models!
    // parse:function (data){
    //     return data.googleMapPoints;
    // }
});