//Testdaten
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Standard-Bewertungskriterien für die Bewertungsapp
    await queryInterface.bulkInsert('Criteria', [
      {
        name: 'Inhalt und fachliche Qualität',
        maxScore: 10,
        weight: 0.3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Umsetzung und Funktionalität',
        maxScore: 10,
        weight: 0.3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Präsentation',
        maxScore: 10,
        weight: 0.25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teamarbeit',
        maxScore: 10,
        weight: 0.15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Nur die durch diesen Seeder angelegten Kriterien entfernen
    await queryInterface.bulkDelete('Criteria', {
      name: [
        'Inhalt und fachliche Qualität',
        'Umsetzung und Funktionalität',
        'Präsentation',
        'Teamarbeit'
      ]
    }, {});
  }
};
