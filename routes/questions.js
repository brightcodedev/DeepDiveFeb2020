const express = require('express');
const router = express.Router();
const models = require('../models');
const multer = require('multer')
const multParse = multer()
const Question = models.Question;
const Choice = models.Choice;
const QuestionChoice = models.QuestionChoice;

router.get('/', async (req, res)=>{
  const questions = await Question.findAll({include: ['choices']});
  res.status(200).json(questions);
})

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const question = await Question.findByPk(id, {include: ['choices']});
  res.status(200).json(question);
})

router.post('/', multParse.none(), async (req, res)=>{
  let postData = req.body;
  let choiceSet = new Set(postData.choices);
  console.log(choiceSet);
  if(choiceSet.size !== 4){
    res.status(400).json({status:'Incorrect number of choices or duplicate choices'});
    return;
  }
  let question = await Question.create(postData, { returning: true});
  postData.choices.forEach( async (choiceId)=>{

    let isAnswer = req.body.answers.includes(choiceId);
    const choice = await Choice.findByPk(choiceId);
    if (!choice) {
      res.status(400);
      return;
    }

    let association = {
      questionId: question.id,
      choiceId: choiceId,
      isAnswer: isAnswer
    }
    QuestionChoice.create(association);

  });

  res.status(200).json({status:'Created Successfully', question:question});
})

router.put('/:id', async (req, res)=>{
  const { id } = req.params;
  const questionToUpdate = await Question.findByPk(id);
  const questionData = req.body;
  questionToUpdate.update(questionData);
  res.status(200).json({status:'Updated Successfully'});
})

router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  Question.destroy({where: {id:id}});
  res.status(200).json({status:'Deleted Successfully'});
})

module.exports = router;
