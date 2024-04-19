const newsRouter = require('./news');
const siteRouter = require('./site');
const jobsRouter = require('./job');
const companyRouter = require('./company');
const authRouter = require('./auth');
const seekersRouter = require('./seeker');
const worksRouter = require('./work');
const emailsRouter = require('./email');

const {
    requireAuth,
    checkUser,
} = require('../util/authMiddleware');

function route(app) {
    app.get('*', checkUser);
    app.use('/company', requireAuth, companyRouter);
    app.use('/job', jobsRouter);
    app.use('/seeker', seekersRouter);
    app.use('/news', newsRouter);
    app.use('/account', authRouter);
    app.use('/work', worksRouter);
    app.use('/sendMail', emailsRouter);
    app.use('/', siteRouter);
}

module.exports = route;