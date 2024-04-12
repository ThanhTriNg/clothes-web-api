// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.addConstraint('Products', {
//             fields: ['categoryId'],
//             type: 'foreign key',
//             name: 'category-user-association',
//             references: {
//                 table: 'Categories',
//                 field: 'id',
//             },
//         });
//         await queryInterface.addConstraint('Products', {
//             fields: ['genderId'],
//             type: 'foreign key',
//             name: 'gender-user-association',
//             references: {
//                 table: 'Genders',
//                 field: 'id',
//             },
//         });
//     },
//     async down(queryInterface, Sequelize) {
//         await queryInterface.removeConstraint('Products', {
//             fields: ['categoryId'],
//             type: 'foreign key',
//             name: 'category-user-association',
//             references: {
//                 table: 'Categories',
//                 field: 'id',
//             },
//         });
//         await queryInterface.removeConstraint('Products', {
//             fields: ['genderId'],
//             type: 'foreign key',
//             name: 'gender-user-association',
//             references: {
//                 table: 'Genders',
//                 field: 'id',
//             },
//         });
//     },
// };
