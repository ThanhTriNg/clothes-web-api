'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // define association here
            // Cart.hasMany(models.Product, {
            //     foreignKey: 'id',
            // });

            // Cart.belongsTo(models.User, {
            //     foreignKey: 'id',
            // });
            // Cart.belongsToMany(models.Product, { through: models.Cart_item });

            Cart.hasMany(models.Cart_item);
        }
    }
    Cart.init(
        {
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Cart',
        },
    );
    return Cart;
};
