// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.addIndex('Roles', ['code']);
//         await queryInterface.addConstraint('Users', {
//             fields: ['roleCode'],
//             type: 'foreign key',
//             name: 'role-user-association',
//             references: {
//                 table: 'Roles',
//                 field: 'code',
//             },
//         });
//     },
//     async down(queryInterface, Sequelize) {
//         queryInterface.removeConstraint('Users', {
//             fields: ['roleCode'],
//             type: 'foreign key',
//             name: 'role-user-association',
//             references: {
//                 table: 'Roles',
//                 field: 'code',
//             },
//         });
//     },
// };
