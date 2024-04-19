const nodemailer = require('nodemailer');
module.exports = {
    sendEjectEmailService: async (email, title) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "dangnhutthai@gmail.com",
                pass: "yawotciulbbikzjl",
            },
        });
        let info = await transporter.sendMail({
            from: '"Website Tuyển dụng việc làm "<dangnhutthai@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Phản hồi hồ sơ xin việc tại Website", // Subject line
            text: "Hello world?", // plain text body
            html: "<Hy>Cám ơn bạn đã quan tâm và ứng tuyển vào công việc <b>" + title +"</b><br>Với số lượng nhận nhân lực có giới hạn, vì vậy rất tiếc CV của mình chưa được chọn cho vị trí lần này. <br>Hy vọng em vẫn tiếp tục theo dõi Website và tìm các các vị trí việc làm khác phù hợp trong tương lai nha. Chúc bạn thật nhiều sức khỏe và thành công trong việc học, công việc sắp tới nhé !</p>"// html body
        });
        return info;
    }, 
    sendApplyEmailService: async (email, title, interviewAddress, interviewDate) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "dangnhutthai@gmail.com",
                pass: "yawotciulbbikzjl",
            },
        });
        let info = await transporter.sendMail({
            from: '"Website Tuyển dụng việc làm "<dangnhutthai@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Phản hồi hồ sơ xin việc tại Website", // Subject line
            text: "Hello world?", // plain text body
            html: "<Hy>Chúc mừng bạn đã ứng tuyển thành công vào công việc: <b>" + title +"</b><br>Xin hãy đến phỏng vấn công việc với địa chỉ: <i>"+interviewAddress+"</i><br>Thời điểm: <i>"+interviewDate+"</i><br>Rất vinh hạnh khi được làm việc cùng bạn!<br>Chúc bạn thành công!<br><b>Xin cảm ơn</b></p>"// html body
        });
        return info;
    }, 
}