// Se definen los modulos a importar
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./passport/passport');

const productsApiRouter = require('./routes/api/products.api.router');
const cartsApiRouter = require('./routes/api/carts.api.router');
const sessionsApiRouter = require('./routes/api/sessions.api.router');
const mocksApiRouter = require('./routes/api/mocks.api.router');
const petsApiRouter = require('./routes/api/pets.api.router');
const notFound404 = require('./middleware/notFound404');
const errorHandler = require('./middleware/errorHandler');

const { publicPath } = require("./utils/utils");

const initServer = require('./server/server');
const connectMongoDB = require('./db/mongodb');

const app = express();

initServer(app).then(() => {
    connectMongoDB();
    app
        .use(express.static(publicPath))
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cookieParser())
        .use('/api', productsApiRouter)
        .use('/api', cartsApiRouter)
        .use('/api', sessionsApiRouter)
        .use('/api/mocks', mocksApiRouter)
        .use('/api', petsApiRouter)
        .use('*', notFound404)
        .use(errorHandler);
});

module.exports = app;