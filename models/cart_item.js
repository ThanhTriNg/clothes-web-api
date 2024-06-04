'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart_item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association here
           
        }
    }
    Cart_item.init(
        {
            productId: DataTypes.INTEGER,
            cartId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            color: DataTypes.STRING,
            size: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Cart_item',
        },
    );
    return Cart_item;
};
