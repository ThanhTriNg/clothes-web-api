'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order_item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association here
        }
    }
    Order_item.init(
        {
            productId: DataTypes.INTEGER,
            orderId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            colorAtOrderTime: DataTypes.STRING,
            sizeAtOrderTime: DataTypes.STRING,
            priceAtOrderTime: DataTypes.STRING,
            productNameAtOrderTime: DataTypes.STRING,
            imageUrlAtOrderTime: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Order_item',
        },
    );
    return Order_item;
};
