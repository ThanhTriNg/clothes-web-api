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

            // cai nay dung nhung ko can -- chac vay
            // Product.belongsToMany(models.Cart, { through: models.Cart_item});
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING,
            subImageUrls: DataTypes.JSON,
            description: DataTypes.TEXT,
            descriptionSort: DataTypes.STRING,
            subCategoryId: DataTypes.INTEGER,
            sizes: DataTypes.JSON,
            colors: DataTypes.JSON,
            gender: DataTypes.ENUM('male', 'female', 'both'),
            stock: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
