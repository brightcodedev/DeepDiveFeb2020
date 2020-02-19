const express = require('express');
const router = express.Router();
const models = require('../models');
const Question = models.Question;

router.get('/', async (req, res)=>{
  const questions = await Question.findAll();
  res.status(200).json(questions);
})

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const question = await Question.findByPk(id);
  res.status(200).json(question);
})

router.post('/', async (req, res)=>{
  let question = await Question.create(req.body, { returning: true});
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
