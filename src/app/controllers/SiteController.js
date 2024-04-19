const job = require('../models/Job');
const location = require('../models/Location');
const career = require('../models/Career');


const {
    multipleMongooseToObject
} = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {

        Promise.all([job.find({}), location.find({}), career.find({})])
            .then(([jobs, locations, careers]) =>
                res.render('home', {
                    jobs: multipleMongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    careers: multipleMongooseToObject(careers),
                })
            )
            .catch(next)
    }

    introduce(req, res, next) {

        res.render('introduce')
    }

    contact(req, res, next) {

        res.render('contact')

    }
}
module.exports = new SiteController();