var express = require('express');
var nunjucks = require('nunjucks');
var fs = require('fs');
var walk = require('walk');

import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/html';

nunjucks.configure(__dirname + '/templates', {
    autoescape: false
});

var server = {

    app: express(),
    files: [],

    initialize: function() {
        server.urlConfs();
        server.updateFileList();
    },

    startWebServer: function() {
        server.app.listen(8000);
        console.log('Listening on port 8000');
    },

    //---------------------------------------------------------------------------------------------
    //FILE HANDLING
    //---------------------------------------------------------------------------------------------

    updateFileList: function() {
        var walker = walk.walk(__dirname + '/recipes', {
            followLinks: false
        });

        walker.on('file', function(root, stat, next) {
            server.files.push(stat.name.replace(/.json/g, ''));
            next();
        });

        walker.on('end', function() {
            server.startWebServer();
        });
    },

    //---------------------------------------------------------------------------------------------
    //VIEWS
    //---------------------------------------------------------------------------------------------
    recipeListing: function(req, res) {
        const files = server.files;
        let links = new Array(),
            i = 0;

        for(i; i < files.length; i++) {
            var name = server.files[i];
            links.push({
                'name': name.replace(/_/g, ' '),
                'url': 'recipes/' + name
            });
        }

        res.send(nunjucks.render('list.html', {
            'links': links
        }));
    },

    recipeDetail: function(req, res) {
        fs.readFile(__dirname + req.url + '.json', 'utf8', function(err, data) {
            if (err != null) {
                res.status(404).send('404 Not found');
            } else {
                res.send(nunjucks.render('recipe.html', JSON.parse(data)));
            }
        });
    },

    guide: function(req, res) {
        res.send(nunjucks.render('guide.html'));
    },

    shoppingList: function(req, res) {
        res.send(nunjucks.render('shoppinglist.html'));
    },

    shoppingList: function(req, res) {
        res.send(
            '<!doctype html>\n' +
            ReactDOM.renderToString((
               <Html assets={webpackIsomoprhicTools.assets()} />
            ))
        );
    },

    //---------------------------------------------------------------------------------------------
    //URL CONFS
    //---------------------------------------------------------------------------------------------
    urlConfs: function() {
        server.app.get('/', server.recipeListing);
        server.app.get('/recipes/*', server.recipeDetail);
        server.app.get('/guide', server.guide);
        server.app.get('/shoppinglist', server.shoppingList);

        server.app.use(express.static(__dirname + '/public//static'));
    }
}

server.initialize();
