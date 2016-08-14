var webpackIsomoprhicTools = require('webpack-isomorphic-tools');
var basePath = require('path').resolve(__dirname, '.');

global.webpackIsomoprhicTools = new webpackIsomoprhicTools(require('./src/isomorphic/webpackIsomorphicToolsConfiguration'))
.development(process.env.NODE_ENV === 'development')
.server(basePath, function()
{
  require('./server')
});
