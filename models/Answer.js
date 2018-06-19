const mongoose = require('mongoose'),
      mongoosePaginate = require('mongoose-paginate');

const answerSchema = mongoose.Schema({
    content: {type: String, required: true},
    published: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    questionId: {type: String, required: true},
    updated_at: {type: Date, default: Date.now}
});

answerSchema.plugin(mongoosePaginate);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;