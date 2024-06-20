import db from '../models';

export const getOrder = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Order.findAll({
                where: { userId },
                include: [
                    {
                        model: db.Order_item,
                        attributes: {
                            exclude: ['OrderId'],
                        },
                    },
                ],
            });
            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : `Not found `,
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

//order_item orderItem
export const createOrder = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const responseUser = await db.User.findOne({
                where: { id: userId },
            });

            const responseOrder = await db.Order.create({
                userId,
                userLNameAtOrderTime: responseUser.lName,
                userFNameAtOrderTime: responseUser.fName,
                userAddressAtOrderTime: responseUser.address,
                userPhoneAtOrderTime: responseUser.phone,
            });

            const orderId = responseOrder.id;
            const orderItems = body.map((item) => {
                const {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    imageUrl: productImageUrl,
                } = item.product;
                const size = item.size;
                const quantity = item.quantity;
                const color = item.color;
                return {
                    productId,
                    orderId,
                    quantity,
                    colorAtOrderTime: color,
                    sizeAtOrderTime: size,
                    productNameAtOrderTime: productName,
                    priceAtOrderTime: productPrice,
                    imageUrlAtOrderTime: productImageUrl,
                };
            });
            await db.Order_item.bulkCreate(orderItems);

            resolve({
                message: 'ok',
            });
        } catch (error) {
            reject(error);
        }
    });
