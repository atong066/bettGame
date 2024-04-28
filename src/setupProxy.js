const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Your Spring MVC API endpoints
    createProxyMiddleware({
      target: 'http://localhost:8080', // Your Java Spring MVC server address
      changeOrigin: true,
    })
  );
};