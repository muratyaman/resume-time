// @see https://create-react-app.dev/docs/proxying-api-requests-in-development
// used at dev time by 'yarn start'

const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:' + config.serverPort,
      changeOrigin: true,
    })
  );
};
