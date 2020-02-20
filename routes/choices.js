const express = require("express");
const router = express.Router();
const models = require("../models");

const Choice = models.Choice;

router.get('/', async (req, res)=>{
  const choices = await Choice.findAll();
  res.status(200).json(choices);
})

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const choice = await Choice.findByPk(id);
  res.status(200).json(choice);
})

router.post('/', async (req, res)=>{
  let choice = await Choice.create(req.body, { returning: true});
  res.status(200).json({status:'Created Successfully', choice:choice});
})

router.put('/:id', async (req, res)=>{
  const { id } = req.params;
  const choiceToUpdate = await Choice.findByPk(id);
  const choiceData = req.body;
  choiceToUpdate.update(choiceData);
  res.status(200).json({status:'Updated Successfully'});
})

router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  Choice.destroy({where: {id:id}});
  res.status(200).json({status:'Deleted Successfully'});
})

module.exports = router;
