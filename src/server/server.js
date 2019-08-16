import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/html';

const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');

nunjucks.configure(`${__dirname}/templates`, {
    autoescape: false
});

const server = {
    app: express(),
    files: [],

    initialize() {
        server.urlConfs();
    },

    startWebServer() {
        server.app.listen(8000);
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
        server.app.get('/shoppinglist', server.shoppingList);

        server.app.use(express.static(`${__dirname}/public/static`));
    }
};

export default server;
