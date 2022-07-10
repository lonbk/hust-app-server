const meRouter = require('./me');
const classesRouter = require('./classes');
const siteRouter = require('./site');

function route(app) {
    app.use('/me', meRouter);
    app.use('/classes', classesRouter);

    app.use('/', siteRouter);
}

module.exports = route;