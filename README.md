BUGS:
- `npm run build` only calls webpack to transpile and bundle JS assets, does not
  copy over any other assets (e.g. public/index.html)

TODO:
- more research on good project folder structures + how to build for production
- look into http://webpack.github.io/docs/webpack-dev-server.html or
  http://webpack.github.io/docs/webpack-dev-middleware.html for better webpack
  build times
- look into https://github.com/glenjamin/webpack-hot-middleware
- read https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/