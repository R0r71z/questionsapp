const Question = require('../models/Question');
const error = require('../helper').error;

exports.getQuestions = async (query, page, limit) => {
    var options = {
        page,
        limit
    };

    try {
        return await Question.paginate(query, options)
    } catch(e) {
        error('Failed to fetch the questions.');
    }
};

exports.createQuestion = async (questionObject) => {
    var newQuestion = new Question({
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
    try {
        var oldQuestion = await Question.findById(questionObject.id);
    } catch(e) {
        error(`Question ID: ${questionObject.id} was not found.`);
    }
    
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