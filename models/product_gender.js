'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_Gender extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product_Gender.hasMany(models.Gender, { foreignKey: 'id', sourceKey: 'genderId' });
        }
    }
    Product_Gender.init(
        {
            productId: DataTypes.INTEGER,
            genderId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Product_Gender',
        },
    );
    return Product_Gender;
};