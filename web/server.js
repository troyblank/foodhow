var express = require('express');
var handlebars = require('handlebars');
var fs = require('fs');
var walk    = require('walk');

var server = {

    app:express(),
    files:[],

    initialize:function(){
        server.urlConfs();
        server.updateFileList();
    },

    startWebServer:function(){
        server.app.listen(8000);
        console.log('Listening on port 8000');
    },

    //---------------------------------------------------------------------------------------------
    //FILE HANDLING
    //---------------------------------------------------------------------------------------------

    updateFileList:function(){
        var walker  = walk.walk('./web/recipes', {followLinks:false});

        walker.on('file', function(root, stat, next){
            server.files.push(stat.name.replace(/.json/g, ''));
            next();
        });

        walker.on('end', function(){
            server.startWebServer();
        });
    },

    //---------------------------------------------------------------------------------------------
    //VIEWS
    //---------------------------------------------------------------------------------------------
    recipeListing:function(req, res){
        var links = '';
        var i = server.files.length-1;
        while(i >= 0){
            var name = server.files[i];
            links += '<a href="recipes/'+name+'">'+name+'</a><br />';
            i--;
        }
       res.send(links);
    },

    recipeDetail:function(req, res){
        fs.readFile('./web/'+req.url+'.json', 'utf8', function(err, data){
            if(err != null){
                res.status(404).send('404 Not found');
            }else{
                server.renderRecipe(JSON.parse(data), function(render){
                    res.send(render);
                });
            }
        });
    },

    renderRecipe:function(json, callback){
        fs.readFile('./web/templates/recipe.html', 'utf8', function(err, data){
            var template = handlebars.compile(data);
            //var context = {title: "My New Post", body: "This is my first post!"};
            var html = template(json);
            callback(html)
        });
    },

    //---------------------------------------------------------------------------------------------
    //URL CONFS
    //---------------------------------------------------------------------------------------------
    urlConfs:function(){
        server.app.get('/', server.recipeListing);
        server.app.get('/recipes/*', server.recipeDetail);
    }
}



server.initialize();