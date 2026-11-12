# 4aAPC_ITL1_Einheit2-3

# Einheit 2–3 – Installation, Konfiguration und Datenmodell – <Negin Khawari>

Klasse: <4aAPC>
Datum: 30.09.2026

## Setup

Backend:
```
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Frontend (in a second terminal, while the backend is running):
```
cd frontend
npm install
npm start
```

The Ionic app opens at `http://localhost:8100` and requests projects from
`http://localhost:3000`. Set the backend URL in
`frontend/src/environments/environment.ts` when it runs on another host or port.

Eigene `config/config.json` lokal aus `config/config.example.json` ableiten, nicht committen.

## Heute gemacht
Heute habe ich das Node.js-Projekt mit Sequelize und MySQL eingerichtet, die sechs Modelle mit Migrationen erstellt und die Primär- und Fremdschlüssel sowie den Unique-Constraint eingerichtet.
Danach habe ich die Migrationen ausgeführt, Beispieldaten in die Tabellen eingefügt, Screenshots vorbereitet und das Projekt mit Git auf GitHub gepusht.

## Einheit 1: Installation

- [ ] Screenshot Toolchain (`node --version`, `ionic --version`, laufendes DB-Tool bzw. Docker-Container)
- [ ] Antworten auf die vier Verständnisfragen: `docs/screenshots/einheit1-fragen.md`

## Einheit 2: Datenmodell anlegen

- [ ] Ausgefüllte Planungsvorlage: `docs/diagramm/planungsvorlage.html`
- [ ] Verwendete `model:generate`-Befehle dokumentiert
- [ ] Screenshot der angelegten Tabellen im DB-Tool: `docs/screenshots/`

## Einheit 3: Assoziationen und weitere Modelle

- [ ] Alle Modelle (Team, Member, Project, Criterion, Juror, Evaluation) mit ausgefüllten `associate`-Methoden
- [ ] Unique-Constraint auf (projectId, criterionId, jurorId) bei Evaluation
- [ ] Mindestens ein Seeder mit Testdaten

## Einheit 4: Backend-Routen

- [ ] CRUD für Team und Project
- [ ] POST-Route für Evaluation inkl. Validierung
- [ ] Aggregations-Route: Durchschnitt der Punktzahl pro Projekt und Kriterium
- [ ] Kurze Endpunkt-Dokumentation (Methode, Pfad, Body, Rückgabe) unten in diesem README oder in `docs/`

## Einheit 5: Postman-Test

- [ ] Collection: `docs/postman/bewertungsapp.postman_collection.json`
- [ ] Environment: `docs/postman/bewertungsapp.postman_environment.json`
- [ ] Mindestens zwei dokumentierte Negativtests
- [ ] Testbericht: `docs/postman/testbericht.md`

## Einheit 6: IONIC-Frontend

- [x] Projektliste mit Team-Zuordnung
- [x] Detailansicht eines Projekts mit bisherigen Bewertungen
- [x] API-Service vollständig an eigenes Backend angebunden

## Einheit 7: Login und Endabgabe

- [ ] Bewertungsformular (Projekt, Kriterium, Punktzahl, Kommentar) mit Validierung
- [ ] Auswertungsseite mit Durchschnittswerten
- [ ] Juror-Login, Token-Storage mit `@capacitor/preferences`
- [ ] Nachweis: geschützte Route liefert ohne Token 401, mit gültigem Token die erwartete Antwort

## Endpunkt-Dokumentation (laufend ergänzen)

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | /teams | – | Liste aller Teams |

## Bekannte Einschränkungen

<hier eintragen, was noch fehlt oder bekannt fehlerhaft ist>

## Git

- [] \gitignore\ erstellt
- [] Änderungen committed und zu GitHub gepusht
- [] Git-Tag \lab2\ erstellt und zu GitHub gepusht