//Backed Servre
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routen importieren
const teamsRouter = require('./routes/team');
const projectsRouter = require('./routes/project');
const evaluationsRouter = require('./routes/evaluation');
const statisticsRouter = require('./routes/statistics');

// Routen registrieren
app.use('/teams', teamsRouter);
app.use('/projects', projectsRouter);
app.use('/evaluations', evaluationsRouter);
app.use('/statistics', statisticsRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
