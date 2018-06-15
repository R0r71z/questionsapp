const mongoose = require('mongoose'),
      mongoosePaginate = require('mongoose-paginate');

const questionSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    updated_at: {type: Date, default: Date.now},
    active: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    answers: {type: Array, default: []}
});

questionSchema.plugin(mongoosePaginate);
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;