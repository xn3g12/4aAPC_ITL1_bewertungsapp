# Postman-Testbericht – Bewertungsapp

## Testumfang

Die Collection prueft die Team- und Projekt-Endpunkte (Liste, Einzelabruf, Erstellen, Aktualisieren und Loeschen), das Anlegen einer Bewertung sowie `/statistics/averages`. Die Requests pruefen Statuscodes und wichtige Eigenschaften der JSON-Antworten. Die IDs des in der Collection erzeugten Teams und Projekts werden waehrend des Laufs im Environment gespeichert.

Negativtests:

1. `POST /teams` ohne `name`: erwartet `400` und eine `error`-Meldung.
2. `POST /projects` mit nicht vorhandener `teamId`: erwartet `400` und eine `error`-Meldung.
3. Dieselbe Bewertung zweimal anlegen: der zweite Request erwartet wegen des Unique-Constraints `409` und eine `error`-Meldung.

## Voraussetzungen und Ausfuehrung

- Backend und MySQL-Datenbank starten; Migrationen ausfuehren.
- Kriteriumsdaten mit `npx sequelize-cli db:seed:all` anlegen.
- In Postman `Bewertungsapp lokal` auswaehlen. `criterionId` muss auf ein vorhandenes Kriterium zeigen; `jurorId` muss auf einen vorhandenen Juror zeigen. Im Repository gibt es keinen Juror-Seeder, daher muss vor dem Bewertungstest ein Juror in der Datenbank vorhanden sein.
- Die Requests in der Collection-Reihenfolge ausfuehren oder die ganze Collection mit dem Collection Runner starten. Bewertungs- und Auswertungsrequests muessen vor den Loeschrequests ausgefuehrt werden.

## Ergebnis

Die Collection ist auf Basis der implementierten Routen und ihrer erwarteten Statuscodes erstellt. Ein Lauf gegen eine gestartete API samt lokaler MySQL-Datenbank wurde in dieser Arbeitsumgebung nicht durchgefuehrt; daher liegen keine tatsaechlich beobachteten HTTP-Antworten vor. Die Spalte „Tatsaechliches Ergebnis“ ist nach dem Lauf im Postman Collection Runner mit den dort angezeigten Ergebnissen zu ergaenzen.

| Test | Erwartung | Tatsaechliches Ergebnis |
|---|---|---|
| Team- und Projekt-CRUD | `200` / `201` / `204`, passende IDs und Daten | Nicht ausgefuehrt; nach lokalem Lauf eintragen |
| Team ohne `name` | `400`, `error`-Feld | Nicht ausgefuehrt; nach lokalem Lauf eintragen |
| Projekt mit unbekannter `teamId` | `400`, `error`-Feld | Nicht ausgefuehrt; nach lokalem Lauf eintragen |
| Bewertung erstellen und wiederholen | zuerst `201`, danach `409` | Nicht ausgefuehrt; gueltige Kriteriums- und Juror-IDs benoetigt |
| Durchschnittswerte | `200`, JSON-Liste | Nicht ausgefuehrt; nach lokalem Lauf eintragen |

Nach dem Collection-Runner-Lauf hier die tatsaechlichen Statuscodes, Testergebnisse und die Uebereinstimmung mit den Erwartungen dokumentieren, bevor der Bericht abgegeben wird.
