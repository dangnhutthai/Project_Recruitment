const job = require('../models/Job');
const location = require('../models/Location');
const career = require('../models/Career');
const page_size = 6;

const {
    multipleMongooseToObject
} = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        var page = req.query.page;
        if (page) {
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
        } else if(page === String) {
            page = 1;
        } else {
            page = 1;
        }
        var index = (page -1) * page_size;
        Promise.all([job.find({}).sort({_id: -1}).skip(index).limit(page_size), location.find({}), career.find({}), page])
            .then(([jobs, locations, careers, page]) =>
                res.render('home', {
                    jobs: multipleMongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    careers: multipleMongooseToObject(careers),
                    page,
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