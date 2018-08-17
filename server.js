const { createServer } = require("http");
const next = require("next");
const routes = require("./routes");

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

app.prepare().then(() => 
    createServer(routes.getRequestHandler(app)).listen(3000, err => {
        if (err) throw err;
        console.log("Running on localhost:3000");
    }));