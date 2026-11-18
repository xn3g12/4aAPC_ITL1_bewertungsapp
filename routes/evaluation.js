//abrufen
const express = require('express');
const router = express.Router();

const {
  Evaluation,
  Project,
  Criterion,
  Juror
} = require('../models');

// POST /evaluations – Neue Bewertung speichern
router.post('/', async (req, res) => {
  try {
    const { projectId, criterionId, jurorId, score, comment } = req.body;

    // Pflichtfelder und Punktzahl prüfen
    if (
      projectId == null ||
      criterionId == null ||
      jurorId == null ||
      score == null
    ) {
      return res.status(400).json({
        error: 'projectId, criterionId, jurorId und score sind erforderlich.'
      });
    }

    if (
      !Number.isInteger(Number(projectId)) ||
      !Number.isInteger(Number(criterionId)) ||
      !Number.isInteger(Number(jurorId)) ||
      !Number.isInteger(Number(score))
    ) {
      return res.status(400).json({
        error: 'IDs und score müssen ganzzahlige Werte sein.'
      });
    }

    if (Number(score) < 0) {
      return res.status(400).json({
        error: 'score darf nicht negativ sein.'
      });
    }

    // Prüfen, ob die referenzierten Datensätze existieren
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(400).json({
        error: 'Das angegebene Projekt existiert nicht.'
      });
    }

    const criterion = await Criterion.findByPk(criterionId);
    if (!criterion) {
      return res.status(400).json({
        error: 'Das angegebene Kriterium existiert nicht.'
      });
    }

    const juror = await Juror.findByPk(jurorId);
    if (!juror) {
      return res.status(400).json({
        error: 'Der angegebene Juror existiert nicht.'
      });
    }

    if (Number(score) > Number(criterion.maxScore)) {
      return res.status(400).json({
        error: `score darf höchstens ${criterion.maxScore} betragen.`
      });
    }

    const evaluation = await Evaluation.create({
      projectId: Number(projectId),
      criterionId: Number(criterionId),
      jurorId: Number(jurorId),
      score: Number(score),
      comment: comment ?? null
    });

    return res.status(201).json(evaluation);
  } catch (error) {
    console.error(error);

    // Zum Beispiel: Unique-Constraint für Projekt, Kriterium und Juror
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Dieser Juror hat dieses Projekt für dieses Kriterium bereits bewertet.'
      });
    }

    return res.status(500).json({
      error: 'Fehler beim Speichern der Bewertung.'
    });
  }
});

module.exports = router;
