const work = require('../models/Work');
const seeker = require('../models/Seeker');
const {
    mongooseToObject
} = require('../../util/mongoose');

class WorkController {

    // POST /work/store
    store(req, res, next) {
        const id = req.params.id;
        const formData = {
            ...req.body
        };
        const Work = new work(formData);
        Work.save();
        res.redirect('back');
    }

    eject(req, res, next) {
        const id = req.body.userid;
        work.updateOne({
                _id: req.params.id,
                userId: id,
            }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    accept(req, res, next) {
        const id = req.body.userid;

        work.updateOne({
                _id: req.params.id,
                userId: id,
            }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new WorkController();