const routes = require("next-routes")();

routes
    .add("/movie/make", "/movie/make")
    .add("/movie/:movie", "/movie/index")
    .add("/movie/:movie/update", "/movie/update")
    .add("/theater/:movie", "/theater/index");

module.exports = routes;