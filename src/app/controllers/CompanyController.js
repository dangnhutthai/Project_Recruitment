const job = require('../models/Job');
const location = require('../models/Location');
const level = require('../models/Level');
const type = require('../models/Type');
const career = require('../models/Career');
const company = require('../models/Company');
const work = require('../models/Work');
const fs = require('fs');
const bcrypt = require('bcrypt');
const user = require('../models/User');

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
        Promise.all([job.find({
                idcom: req.params.id
            }), job.countDocumentsWithDeleted({
                deleted: true,
                idcom: req.params.id
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
        Promise.all([job.find({}), location.find({}), level.find({}), type.find({}), career.find({}), company.findOne({
                idcom: req.params.id
            })])
            .then(([jobs, locations, levels, types, careers, companys]) =>
                res.render('jobs/create', {
                    jobs: multipleMongooseToObject(jobs),
                    locations: multipleMongooseToObject(locations),
                    levels: multipleMongooseToObject(levels),
                    types: multipleMongooseToObject(types),
                    careers: multipleMongooseToObject(careers),
                    company: mongooseToObject(companys),
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
            .then(() => res.redirect('/'))
            .catch(next)
    }

    updateCompany = async (req, res, next) => {

        const id = req.params.id
        var imgUrl = "";

        if (req.file) {
            var imgUrl = req.file.filename;
        }
        req.body.image = imgUrl;

        try {

            const userInfo = await company.findById(id);
            const userPhotoInfo = userInfo.image;

            if (req.body.imageurl == 'new') {
                await company.findOneAndUpdate({
                    _id: id
                }, req.body);
            } else if (req.body.image != "") {
                fs.unlinkSync("src/public/img/uploads/" + userPhotoInfo);
                await company.findOneAndUpdate({
                    _id: id
                }, req.body);
            } else {
                if (req.body.image == "") {
                    req.body.image = req.body.imageurl;
                }
                await company.findOneAndUpdate({
                    _id: id
                }, req.body);
            }


            res.redirect('back')
        } catch (error) {
            res.status(501).json({
                code: 501,
                message: error.message,
                error: true
            })
        }
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
                deleted: true,
                idcom: req.params.id
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

    showAccount(req, res, next) {
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
        company.findOne({
                _id: req.params.id
            })
            .then(company =>
                res.render('company/edit', {
                    company: mongooseToObject(company)
                })
            )
            .catch(next)
    }

    createCom(req, res, next) {
        res.render('company/create');

    }

    store(req, res, next) {
        const formData = {
            ...req.body
        };
        const Comp = new company(formData);
        Comp.save();
        res.redirect('/');
    }

    firststep(req, res, next) {
        res.render('company/firstview')
    }

    changepwCompany(req, res, next) {
        company.findOne({
                _id: req.params.id
            })
            .then(company =>
                res.render('company/changepw', {
                    company: mongooseToObject(company)
                })
            )
            .catch(next)
    }

    // changepw = async (req, res, next) => {
    //     try {
    //         const salt = bcrypt.genSalt(10);
    //         const id = req.params.id;
    //         const newpw = req.body.newpw;
    //         const oldpw = await bcrypt.hash(req.body.oldpw, salt);
    //         const oldpw2 = req.body.oldpw2;

    //         if (newpw.length < 8) {
    //             res.status(400).json({
    //                 status: false
    //             })
    //         } else if (oldpw === oldpw2) {
    //             newpw = await bcrypt.hash(newpw, salt);
    //             const userPw = await user.findByIdAndUpdate({
    //                 _id: id,
    //             }, {
    //                 password: newpw
    //             }, {
    //                 new: true
    //             });
    //             res.status(200).json({
    //                 status: true,

    //             });
    //         } else {
    //             res.status(400).json({
    //                 status: false,
    //                 old: oldpw
    //             });
    //         }
    //     } catch (err) {
    //         res.status(400).json({
    //             status: false,
    //             error: "Error Occured",
    //         });
    //     }
    // }

    showlist(req, res, next) {
        Promise.all([job.findOne({
                slug: req.params.slug
            }), work.find({
                slug: req.params.slug
            })])
            .then(([job, works]) =>
                res.render('company/list', {
                    job: mongooseToObject(job),
                    works: multipleMongooseToObject(works),
                })
            )
            .catch(next)
    }
}

module.exports = new CompanyController();