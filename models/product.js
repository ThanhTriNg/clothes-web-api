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

            Product.belongsTo(models.Sub_Category, { foreignKey: 'subCategoryId' });
            // Product.belongsTo(models.Gender, { foreignKey: 'genderId' });

            // Product.hasMany(models.Product_Gender, { foreignKey: 'productId',sourceKey:'productGender' });
            Product.hasMany(models.Product_Gender);
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
            subCategoryId: DataTypes.INTEGER,
            // productGenderId: DataTypes.INTEGER, sai roi
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
