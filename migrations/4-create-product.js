'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            imageUrl: {
                type: Sequelize.STRING,
            },
            subImageUrls: {
                // type: Sequelize.JSON,
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            descriptionSort: {
                type: Sequelize.STRING,
            },
            sizes: {
                // type: Sequelize.JSON,
                type: Sequelize.TEXT,
            },
            colors: {
                // type: Sequelize.JSON,
                type: Sequelize.TEXT,
            },
            gender: {
                type: Sequelize.ENUM('male', 'female', 'both'),
                allowNull: false,
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            subCategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Sub_Categories',
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
                // onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    },
};
