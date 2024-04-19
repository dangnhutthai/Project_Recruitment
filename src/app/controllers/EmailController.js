const {
    sendEjectEmailService
} = require('../../services/email');
const {
    sendApplyEmailService
} = require('../../services/email');

class EmailController {
    sendEjectMail = async (req, res, next) => {
        try {
            const { email, title, workId }= req.body;
            if (email) {
                const response = await sendEjectEmailService(email, title)
            }
            return res.redirect('/work/eject/'+workId)
        } catch (e) {
            console.log(e);
            return res.json({
                status: 'errrrrr',
            })
        }
    }
    sendApplyMail = async (req, res, next) => {
        try {
            const {
                email, title, workId, interviewAddress, interviewDate
            } = req.body;
            if (email) {
                const response = await sendApplyEmailService(email, title, interviewAddress, interviewDate)
            }
            return res.redirect('/work/accept/'+workId)

        } catch (e) {
            console.log(e);
            return res.json({
                status: 'errrrrr',
            })
        }
    }
}
module.exports = new EmailController();