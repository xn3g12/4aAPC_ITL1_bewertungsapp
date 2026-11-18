//Datenbankverbindung
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    static associate(models) {
      // Eine Bewertung gehört zu einem Projekt.
      Evaluation.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });

      // Eine Bewertung gehört zu einem Kriterium.
      Evaluation.belongsTo(models.Criterion, {
        foreignKey: 'criterionId'
      });

      // Eine Bewertung gehört zu einem Juror.
      Evaluation.belongsTo(models.Juror, {
        foreignKey: 'jurorId'
      });
    }
  }

  Evaluation.init({
    projectId: DataTypes.INTEGER,
    criterionId: DataTypes.INTEGER,
    jurorId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Evaluation',
  });

  return Evaluation;
};
