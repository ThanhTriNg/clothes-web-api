// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.createTable('Product_Genders', {
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: Sequelize.INTEGER,
//             },

//             productId: {
//                 allowNull: false,
//                 type: Sequelize.INTEGER,
//                 references: {
//                     model: 'Products',
//                     key: 'id',
//                 },
//             },
//             genderId: {
//                 allowNull: false,
//                 type: Sequelize.INTEGER,
//                 references: {
//                     model: 'Genders',
//                     key: 'id',
//                 },
//             },
//             createdAt: {
//                 allowNull: false,
//                 type: 'TIMESTAMP',
//                 defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//             },
//             updatedAt: {
//                 allowNull: false,
//                 type: 'TIMESTAMP',
//                 defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//             },
//         });
//     },
//     async down(queryInterface, Sequelize) {
//         await queryInterface.dropTable('Product_Genders');
//     },
// };

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Product_Genders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },

            genderId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Genders',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Product_Genders');
    },
};
