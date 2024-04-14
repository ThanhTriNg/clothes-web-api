'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING,
            subImageUrls: DataTypes.JSON,
            description: DataTypes.STRING,
            descriptionSort: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            genderId: DataTypes.INTEGER,
            sizes: DataTypes.JSON,
            colors: DataTypes.JSON,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
