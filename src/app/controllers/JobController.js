const job = require('../models/Job');
const work = require('../models/Work');
const career = require('../models/Career');
const location = require('../models/Location');


const {
    mongooseToObject
} = require('../../util/mongoose');
const {
    multipleMongooseToObject
} = require('../../util/mongoose');

class JobController {

    // GET /job/:slug
    show(req, res, next) {
        Promise.all([job.findOne({
                slug: req.params.slug
            }), work.findOne({
                slug: req.params.slug,
            }), job.find({
                
            }).sort({salary: -1}).limit(5),
        ])
            .then(([job, work, jobs]) =>
                res.render('jobs/show', {
                    job: mongooseToObject(job),
                    work: mongooseToObject(work),
                    jobs: multipleMongooseToObject(jobs),
                })
            )
            .catch(next)
    }

    search(req, res, next) {
        const {
            title
        } = req.query
        Promise.all([job.find({
                "$or": [{
                        title: {
                            $regex: `${title}`, $options: "i",
                        }
                    },
                    {
                        career: {
                            $regex: `${title}`, $options: "i",
                        }
                    },
                    {
                        location: {
                            $regex: `${title}`, $options: "i",
                        }
                    }, {
                        type: {
                            $regex: `${title}`, $options: "i",
                        }
                    }, {
                        company: {
                            $regex: `${title}`, $options: "i",
                        }
                    },
                ]
            }), location.find({}), career.find({})])
            .then(([jobs, locations, careers]) =>
                res.render('jobs/search', {
                    jobs: multipleMongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    careers: multipleMongooseToObject(careers),
                    title
                })
            )
            .catch(next)
    }

    // POST /job/store
    store(req, res, next) {
        const formData = {
            ...req.body
        };
        const Job = new job(formData);
        Job.save();
        res.redirect('/');
    }
}
module.exports = new JobController();