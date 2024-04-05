const job = require('../models/Job');
const work = require('../models/Work');


const {
    mongooseToObject
} = require('../../util/mongoose');
const {
    multipleMongooseToObject
} = require('../../util/mongoose');
const User = require('../models/User');

class JobController {
    
    // GET /job/:slug
    show(req, res, next) {
        Promise.all([job.findOne({ slug: req.params.slug }), work.find({slug: req.params.slug})])
            .then(([job, works]) => 
                res.render('jobs/show', { 
                    job: mongooseToObject(job),
                    works: multipleMongooseToObject(works),
                })
            )
            .catch(next)
    }

    // POST /job/store
    store(req, res, next) {
        const formData = {...req.body};
        const Job = new job(formData);
        Job.save();
        res.redirect('/');
    }
}
module.exports = new JobController();