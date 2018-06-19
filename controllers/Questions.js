const questionService = require('../services/Question');

exports.getQuestions = async (req, res, next) => {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10; 

    try {
        let questions = await questionService.getQuestions({}, page, limit);
        return res.status(200).json({data: questions});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
};

exports.createQuestion = async (req, res, next) => {
    const questionObj = {
        title: req.body.title,
        description: req.body.description
    }

    try {
        const createdQuestion = await questionService.createQuestion(questionObj);
        return res.status(201).json({data: createdQuestion});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
};

exports.updateQuestion = async (req, res, next) => {
    if(!req.body._id) return res.status(400).json({message: "Id must be present"});

    const id = req.body._id;

    const questionObj = {
        id: id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        active: req.body.active ? req.body.active : null,
        deleted: req.body.deleted ? req.body.deleted : null,
    };

    try {
        const updatedQuestion = await questionService.updateQuestion(questionObj);
        return res.status(200).json({data: updatedQuestion});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}

exports.removeQuestion = async (req, res, next) => {
    const id = req.params.id;

    try {
        const removedQuestion = await questionService.updateQuestion({
            id,
            active: false,
            deleted: true,
            answers: [],
        });
        return res.status(200).json({data: removedQuestion});
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
}

exports.addAnswer = async (req, res, next) => {
    const answerObj = {...req.body};
    delete answerObj._id;

    try {
        const createdAnswer = await questionService.addAnswer(answerObj);
        return res.status(201).json({data: createdAnswer});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
};

exports.removeAnswer = async (req, res, next) => {
    const id = req.params.id;
    try {
        const removedAnswer = await questionService.removeAnswer({
            id
        });

        return res.status(200).json({data: removedAnswer});
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
}