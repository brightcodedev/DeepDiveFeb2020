'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    header: DataTypes.STRING,
    subHeader: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
      Question.belongsToMany(models.Choice, {
        through: 'QuestionChoice',
        as: 'choices',
        foreignKey: 'questionId',
        otherKey: 'choiceId'
      })
  };
  return Question;
};
