'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.hasMany(models.Sub_Category);
        }
    }
    Category.init(
        {
            name: DataTypes.STRING,
            gender: DataTypes.ENUM('male', 'female', 'both'),
        },
        {
            sequelize,
            modelName: 'Category',
        },
    );
    return Category;
};
