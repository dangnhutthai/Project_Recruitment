const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const methodOverride = require('method-override');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Job = new schema ({
    _id: { type: Number, },
    address: { type: String },
    requirement: { type: String },
    description: {type: String, default: 'Something here'},
    career: { type: String },
    company: { type: String },
    deadline: { type: Date },
    email: { type: String },
    level: { type: String },
    location: { type: String },
    member: { type: String },
    phone: { type: Number },
    salary: { type: Number },
    title: { type: String },
    type: { type: String },
    benefit: { type: String },
    material: { type: String },
    slug: { type: String, slug: 'title', slugOn: { updateOne: true }, unique: true },
}, {
    _id: false,
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
Job.plugin(AutoIncrement);
Job.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Job', Job)