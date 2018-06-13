const Question = require('../models/Question');
const {error} = require('../helper');

exports.getQuestions = async (query, page, limit) => {
    const options = {
        page,
        limit
    };

    query.deleted = false;

    try {
        return await Question.paginate(query, options)
    } catch(e) {
        error('Failed to fetch the questions.');
    }
};

exports.createQuestion = async (questionObject) => {
    const newQuestion = new Question({
        title: questionObject.title,
        description: questionObject.description,
    });

    try {
        return await newQuestion.save();
    } catch(e) {
        error('Failed to create a new question.');
    }
};

exports.updateQuestion = async (questionObject) => {
    const oldQuestion = await Question.findById(questionObject.id);
    if (!oldQuestion) return false;

    if (questionObject.title) oldQuestion.title = questionObject.title;
    if (questionObject.description) oldQuestion.description = questionObject.description;
    if (questionObject.active) oldQuestion.active = questionObject.active;
    if (questionObject.deleted) oldQuestion.deleted = questionObject.deleted;

    try {
        return await oldQuestion.save();
    } catch(e) {
        error('Failed to save Question object.');
    }
};