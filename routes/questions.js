const express = require('express'),
      router = express.Router(),
      questionsController = require('../controllers/Questions');

router.get('/', questionsController.getQuestions);
router.post('/', questionsController.createQuestion);
router.put('/', questionsController.updateQuestion);
router.delete('/:id', questionsController.removeQuestion);

module.exports = router;