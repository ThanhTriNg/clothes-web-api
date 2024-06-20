'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define association here

            Order.hasMany(models.Order_item);
        }
    }
    Order.init(
        {
            userId: DataTypes.INTEGER,
            userLNameAtOrderTime: DataTypes.STRING,
            userFNameAtOrderTime: DataTypes.STRING,
            userAddressAtOrderTime: DataTypes.STRING,
            userPhoneAtOrderTime: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
