const seeker = require('../models/Seeker');
const eduexp = require('../models/EducationExp');
const workexp = require('../models/WorkExp');
const work = require('../models/Work');
const fs = require('fs');
const {
    mongooseToObject
} = require('../../util/mongoose');
const {
    multipleMongooseToObject
} = require('../../util/mongoose');
const {
    render
} = require('node-sass');

class SeekerController {

    firstview(req, res, next) {
        res.render('seeker/firstview');
    }

    create(req, res, next) {
        res.render('seeker/create');

    }

    showmyjob(req, res, next) {
        work.findWithDeleted({
                "$or": [{
                        userId: req.params.id,
                        deleted: true,
                    }, {
                        userId: req.params.id,
                        deleted: false,
                    },
                ]
            })
            .then(works =>
                res.render('seeker/myjob', {
                    works: multipleMongooseToObject(works)
                })
            )
            .catch(next)

    }

    question(req, res, next) {
        res.render('seeker/questioncreate');

    }

    storeinfo(req, res, next) {
        const formData = {
            ...req.body
        };
        const Seeker = new seeker(formData);
        Seeker.save();
        res.redirect('question');
    }

    createeduexp(req, res, next) {
        res.render('seeker/createeduexp');
    }

    storeeduexp(req, res, next) {
        const id = req.params.id;
        const formData = {
            ...req.body
        };
        const Eduexp = new eduexp(formData);
        Eduexp.save();
        res.redirect('../account/' + id);
    }

    createworkexp(req, res, next) {
        res.render('seeker/createworkexp');
    }

    storeworkexp(req, res, next) {
        const id = req.params.id;
        const formData = {
            ...req.body
        };
        const Workexp = new workexp(formData);
        Workexp.save();
        res.redirect('../account/' + id);
    }

    showaccount(req, res, next) {
        Promise.all([seeker.findOne({
                    idseeker: req.params.id
                }), eduexp.find({
                    idseeker: req.params.id
                }), workexp.find({
                    idseeker: req.params.id
                })

            ])

            .then(([seeker, eduexps, workexps]) =>
                res.render('seeker/personal', {
                    seeker: mongooseToObject(seeker),
                    eduexps: multipleMongooseToObject(eduexps),
                    workexps: multipleMongooseToObject(workexps),
                })
            )
            .catch(next)
    }

    deleteWork(req, res, next) {
        workexp.deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    deleteEdu(req, res, next) {
        eduexp.deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    showeditwork(req, res, next) {
        workexp.findOne({
                _id: req.params.id
            })
            .then((workexp) =>
                res.render('seeker/editworkexp', {
                    workexp: mongooseToObject(workexp),
                })
            )
            .catch(next);
    }

    updateworkexp(req, res, next) {
        workexp.updateOne({
                _id: req.params.id
            }, req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    showeditinfo(req, res, next) {
        seeker.findOne({
                idseeker: req.params.id
            })
            .then((seeker) =>
                res.render('seeker/editinfo', {
                    seeker: mongooseToObject(seeker),
                })
            )
            .catch(next);
    }

    updateinfo = async (req, res, next) => {

        const id = req.params.id
        var imgUrl = "";

        if (req.file) {
            var imgUrl = req.file.filename;
        }

        req.body.image = imgUrl;

        try {
            const userInfo = await seeker.findById(id);
            const userPhotoInfo = userInfo.image;

            if (req.body.imageurl == 'new') {
                await seeker.findOneAndUpdate({
                    _id: id
                }, req.body);
            } else if (req.body.image != "") {
                fs.unlinkSync("src/public/img/uploads/" + userPhotoInfo);
                await seeker.findOneAndUpdate({
                    _id: id
                }, req.body);
            } else {
                if (req.body.image == "") {
                    req.body.image = req.body.imageurl;
                }
                await seeker.findOneAndUpdate({
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

    showeditedu(req, res, next) {
        eduexp.findOne({
                _id: req.params.id
            })
            .then((eduexp) =>
                res.render('seeker/editeduexp', {
                    eduexp: mongooseToObject(eduexp),
                })
            )
            .catch(next);
    }

    updateeduexp(req, res, next) {
        eduexp.updateOne({
                _id: req.params.id
            }, req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }
}

module.exports = new SeekerController();