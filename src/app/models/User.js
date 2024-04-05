const mongoose = require('mongoose')
const schema = mongoose.Schema;
const {
    isEmail,
} = require('validator');
const bcrypt = require('bcrypt');


const User = new schema({
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: [true, 'Email này đã được đăng kí'],
        lowercase: true,
        validate: [isEmail, 'Vui lòng nhập email hợp lệ']
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minLength: [8, 'Mật khẩu có ít nhất 8 kí tự'],
        maxLength: [16, 'Mật khẩu tối đa 16 kí tự'],
    },
    type_user: {
        type: String,
    },

});


//su dung ham` truoc khi luu du lieu vao db
User.pre('save', async function (next) {
    const salt = bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, parseInt(salt));
    next();
})

//static method to login user
User.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model('User', User)