'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionChoice = sequelize.define('QuestionChoice', {
    questionId: DataTypes.INTEGER,
    choiceId: DataTypes.INTEGER,
    isAnswer: DataTypes.BOOLEAN
  }, {});
  QuestionChoice.associate = function(models) {
    // associations can be defined here
  };
  return QuestionChoice;
};