import WebpackIsomoprhicTools from 'webpack-isomorphic-tools';
import WebpackIsomorphicToolsConfiguration from '../isomorphic/webpackIsomorphicToolsConfiguration';
const basePath = require('path').resolve(__dirname, '.');

global.webpackIsomoprhicTools = new WebpackIsomoprhicTools(WebpackIsomorphicToolsConfiguration)
.development('development' === process.env.NODE_ENV)
.server(basePath, () => {
    require('./server');
});
