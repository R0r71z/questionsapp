const Question = require('../models/Question');
const Answer = require('../models/Answer');
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

exports.getQuestion = async (id) => {
    try {
        return await Question.findById(id);
    } catch (e) {
        error(e.message);
    }
}

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

exports.addAnswer = async (answerObject) => {
    const newAnswer = new Answer(answerObject);

    try {
        const question = await Question.findById(answerObject.questionId);
        question.answers.push(newAnswer);
        await question.save();
        return await newAnswer.save();
    } catch(e) {
        error(e.message);
    }
}

exports.getAnswers = async (id) => {
    try {
        return await Answer.paginate({questionId: id});
    } catch(e) {
        error(e.message);
    }
    
    
}

exports.removeAnswer = async (query) => {
    query.deleted = true;
    query.published = false;
    try {
        const updated = await Answer.findOneAndUpdate(query);
        const question = await Question.findById(updated.questionId);

        question.answers = question.answers.filter(answer => updated._id.toString() !== answer._id.toString());
        await question.save();
        return updated;
    } catch(e) {
        error(e.message);
    }
}
