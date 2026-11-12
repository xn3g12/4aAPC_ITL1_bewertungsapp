
const express = require('express');
const router = express.Router();
const { Project, Team, Evaluation, Criterion } = require('../models');

// GET /projects – Alle Projekte abrufen
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: Team },
        { model: Evaluation, include: [{ model: Criterion }] }
      ]
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Projekte.' });
  }
});

// GET /projects/:id – Ein Projekt abrufen
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: Team },
        { model: Evaluation, include: [{ model: Criterion }] }
      ]
    });

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden.' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Projekts.' });
  }
});

// POST /projects – Neues Projekt erstellen
router.post('/', async (req, res) => {
  try {
    const { teamId, titel, beschreibung, praesentiertAm } = req.body;

    if (!teamId || !titel || !beschreibung || !praesentiertAm) {
      return res.status(400).json({
        error: 'teamId, titel, beschreibung und praesentiertAm sind erforderlich.'
      });
    }

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(400).json({ error: 'Das angegebene Team existiert nicht.' });
    }

    const project = await Project.create({
      teamId,
      titel,
      beschreibung,
      praesentiertAm
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Erstellen des Projekts.' });
  }
});

// PUT /projects/:id – Projekt aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden.' });
    }

    const { teamId, titel, beschreibung, praesentiertAm } = req.body;

    if (teamId !== undefined) {
      const team = await Team.findByPk(teamId);

      if (!team) {
        return res.status(400).json({ error: 'Das angegebene Team existiert nicht.' });
      }

      project.teamId = teamId;
    }

    if (titel !== undefined) project.titel = titel;
    if (beschreibung !== undefined) project.beschreibung = beschreibung;
    if (praesentiertAm !== undefined) project.praesentiertAm = praesentiertAm;

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Projekts.' });
  }
});

// DELETE /projects/:id – Projekt löschen
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Projekt nicht gefunden.' });
    }

    await project.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Projekt konnte nicht gelöscht werden. Prüfe vorhandene Bewertungen.'
    });
  }
});

module.exports = router;
