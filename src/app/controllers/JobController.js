const job = require('../models/Job')
const {
    mongooseToObject
} = require('../../util/mongoose');

class JobController {
    
    // GET /job/:slug
    show(req, res, next) {
        job.findOne({ slug: req.params.slug })
            .then(job => 
                res.render('jobs/show', { job: mongooseToObject(job) })
            )
            .catch(next)
    }

    // POST /job/store
    store(req, res, next) {
        const formData = {...req.body};
        const Job = new job(formData);
        Job.save();
        res.redirect('../company/stored');
    }
}
module.exports = new JobController();