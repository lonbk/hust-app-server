const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const ClasseSchema = new Schema(
    {
        id: { type: Number },
        full_name: { type: String },
        email: { type: String },
        gender: { type: String },
        class: { type: String },
        mssv: { type: Number },
        status: { type: Number },
        avatar: { type: String   },
        department_name: { type: String },
        date_of_birth: { type: Number },
    },
    {
        timestamps: true,
    },
);

// Custom query helpers
ClasseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugins
mongoose.plugin(slug);
ClasseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Classe', ClasseSchema);
