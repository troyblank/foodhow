import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/html';

const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const walk = require('walk');

nunjucks.configure(`${__dirname}/templates`, {
    autoescape: false
});

const server = {
    app: express(),
    files: [],

    initialize() {
        server.urlConfs();
        server.updateFileList();
    },

    startWebServer() {
        server.app.listen(8000);
        /* eslint-disable no-console */
        console.log('Listening on port 8000');
        /* eslint-enable no-console */
    },

    //---------------------------------------------------------------------------------------------
    // FILE HANDLING
    //---------------------------------------------------------------------------------------------
    updateFileList() {
        const walker = walk.walk(`${__dirname}/recipes`, {
            followLinks: false
        });

        walker.on('file', (root, stat, next) => {
            server.files.push(stat.name.replace(/.json/g, ''));
            next();
        });

        walker.on('end', () => {
            server.startWebServer();
        });
    },

    //---------------------------------------------------------------------------------------------
    // VIEWS
    //---------------------------------------------------------------------------------------------
    recipeListing(req, res) {
        const { files } = server;
        const links = [];
        let i = 0;
        let name;

        for (i; i < files.length; i += 1) {
            name = server.files[i];
            links.push({
                name: name.replace(/_/g, ' '),
                url: `recipes/${name}`
            });
        }

        res.send(nunjucks.render('list.html', {
            links
        }));
    },

    recipeDetail(req, res) {
        fs.readFile(`${__dirname}${req.url}.json`, 'utf8', (err, data) => {
            if (null != err) {
                res.status(404).send('404 Not found');
            } else {
                res.send(nunjucks.render('recipe.html', JSON.parse(data)));
            }
        });
    },

    guide(req, res) {
        res.send(nunjucks.render('guide.html'));
    },

    shoppingList(req, res) {
        res.send(
            `<!doctype html>
            ${ReactDOM.renderToString((<Html assets={webpackIsomoprhicTools.assets()} />))}`
        );
    },

    //---------------------------------------------------------------------------------------------
    // URL CONFS
    //---------------------------------------------------------------------------------------------
    urlConfs() {
        server.app.get('/', server.recipeListing);
        server.app.get('/recipes/*', server.recipeDetail);
        server.app.get('/guide', server.guide);
        server.app.get('/shoppinglist', server.shoppingList);

        server.app.use(express.static(`${__dirname}/public/static`));
    }
};

export default server;
