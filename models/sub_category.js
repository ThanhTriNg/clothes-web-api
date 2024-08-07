'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sub_Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Sub_Category.hasMany(models.Category, { foreignKey: 'id', sourceKey: 'categoryId' });
        }
    }
    Sub_Category.init(
        {
            name: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Sub_Category',
        },
    );
    return Sub_Category;
};
