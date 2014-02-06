var express = require('express');
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
        var walker  = walk.walk('./recipes', {followLinks:false});

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
            links += '<a href="recipe/'+name+'">'+name+'</a><br />';
            i--;
        }
       res.send(links);
    },

    recipeDetail:function(req, res){
        res.send('this is a detail')
    },

    //---------------------------------------------------------------------------------------------
    //URL CONFS
    //---------------------------------------------------------------------------------------------
    urlConfs:function(){
        server.app.get('/', server.recipeListing);
        server.app.get('/recipe/*', server.recipeDetail);
    }
}



server.initialize();