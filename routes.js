const routes = require("next-routes")();

routes
    .add("/movie/make", "/movie/make")
    .add("/movie/update", "/movie/update")
    .add("/movie/:address", "/movie/index")
    .add("/theater/:address", "/theater/index");

module.exports = routes;