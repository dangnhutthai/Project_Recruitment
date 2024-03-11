const job = require('../models/Job');
const location = require('../models/Location');
const level = require('../models/Level');
const type = require('../models/Type');
const career = require('../models/Career');
const company = require('../models/Company');

const {
    multipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');
const {
    render
} = require('node-sass');

class CompanyController {

    // GET /company/stored
    stored(req, res, next) {
        Promise.all([job.find({}), job.countDocumentsWithDeleted({
                deleted: true
            })])
            .then(([jobs, countDelete]) =>
                res.render('company/stored', {
                    jobs: multipleMongooseToObject(jobs),
                    countDelete,
                })
            )
            .catch(next)
    }

    // GET /job/create
    create(req, res, next) {
        Promise.all([job.find({}), location.find({}), level.find({}), type.find({}), career.find({})])
            .then(([jobs, locations, levels, types, careers]) =>
                res.render('jobs/create', {
                    jobs: multipleMongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    levels: multipleMongooseToObject(levels),
                    types: multipleMongooseToObject(types),
                    careers: multipleMongooseToObject(careers),
                })
            )
            .catch(next)
    }

    // GET /company/:id/edit
    editJob(req, res, next) {
        Promise.all([job.findById(req.params.id), location.find({}), level.find({}), type.find({}), career.find({})])
            .then(([jobs, locations, levels, types, careers]) =>
                res.render('jobs/edit', {
                    job: mongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    levels: multipleMongooseToObject(levels),
                    types: multipleMongooseToObject(types),
                    careers: multipleMongooseToObject(careers),
                })
            )
            .catch(next)
    }

    // PUT /company/:id
    updateJob(req, res, next) {
        job.updateOne({
                _id: req.params.id
            }, req.body)
            .then(() => res.redirect('/company/stored'))
            .catch(next)
    }

    // DELETE /company/:id
    deleteJob(req, res, next) {
        job.delete({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // DELETE /company/:id/force
    forceDeleteJob(req, res, next) {
        job.deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // GET /company/trash
    trash(req, res, next) {
        job.findWithDeleted({
                deleted: true
            })
            .then((jobs) =>
                res.render('company/trash', {
                    jobs: multipleMongooseToObject(jobs),
                }),
            )
            .catch(next)
    }

    // PATCH /company/:id/restore
    restoreJob(req, res, next) {
        job.restore({
                _id: req.params.id
            })
            .then(jobs => {
                res.redirect('back')
            })
            .catch(next)
    }

    showDetails(req, res, next) {
        company.findOne({
                idcom: req.params.id
            })
            .then(company =>
                res.render('company/personal', {
                    company: mongooseToObject(company)
                })
            )
            .catch(next)
    }

    editCompany(req, res, next) {
        res.render('company/edit');
    }

    createCom(req, res, next) {

        res.render('company/create');
        // const formData = {
        //     ...req.body
        // };
        // const Comp = new company(formData);
        // Comp.save();
        // res.redirect('../company/account');

    }

    store(req, res, next) {
        const formData = {
            ...req.body
        };
        const Comp = new company(formData);
        Comp.save();
        console.log(formData)
        res.redirect('/');

    }
}

module.exports = new CompanyController();