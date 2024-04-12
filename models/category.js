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
            Category.belongsTo(models.Role, { foreignKey: 'role_code', targetKey: 'code', as: 'roleCode' });
            // Category.belongsTo(models.Role);
            // models.Role.hasMany(Category);
        }
    }
    Category.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Category',
        },
    );
    return Category;
};
