const newsRouter = require('./news');
const siteRouter = require('./site');
const jobsRouter = require('./job');
const companyRouter = require('./company');
const authRouter = require('./auth');
const {
    requireAuth,
    checkUser
} = require('../util/authMiddleware');

function route(app) {
    app.get('*', checkUser);
    app.use('/company', requireAuth, companyRouter);
    app.use('/job', jobsRouter);
    app.use('/news', newsRouter);
    app.use('/account', authRouter);
    app.use('/', siteRouter);
}

module.exports = route;