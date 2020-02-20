'use strict';
module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('Choice', {
    text: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Choice.associate = function(models) {
    Choice.belongsToMany(models.Question, {
      through: 'QuestionChoice',
      as: 'questions',
      foreignKey: 'choiceId',
      otherKey: 'questionId'
    })
  };
  return Choice;
};
