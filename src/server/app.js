import WebpackIsomoprhicTools from 'webpack-isomorphic-tools';
import WebpackIsomorphicToolsConfiguration from '../isomorphic/webpackIsomorphicToolsConfiguration';
import server from './server';
const basePath = require('path').resolve(__dirname, '.');

global.webpackIsomoprhicTools = new WebpackIsomoprhicTools(WebpackIsomorphicToolsConfiguration)
.development('development' === process.env.NODE_ENV)
.server(basePath, () => {
    server.initialize();
});
