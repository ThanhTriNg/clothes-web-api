import db from '../models';

export const createCart = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Cart.findOrCreate({
                where: { userId },
            });
            resolve({
                response,
                err: response[1] ? 0 : 1,
                message: response[1] ? 'Create cart' : 'Cart exist',
            });
        } catch (error) {
            reject(error);
        }
    });

export const getCart = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Cart.findAll({
                where: { userId },
                include: [{ model: db.Cart_item }],
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

//cart_item cartItem
export const addItemIntoCart = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const [responseCart, isCreatedCart] = await db.Cart.findOrCreate({
                where: { userId },
                include: [{ model: db.Cart_item }],
            });

            const cartId = responseCart.id;

            const newItemsIdentifiers = body.map((item) => ({
                productId: item.product.id,
                color: item.color,
                size: item.size,
            }));

            // Remove old cart items that are not in the new body
            await db.Cart_item.destroy({
                where: {
                    cartId,
                    [db.Sequelize.Op.not]: newItemsIdentifiers,
                },
            });

            for (const item of body) {
                const { id: productId } = item.product;
                const size = item.size;
                const quantity = item.quantity;
                const color = item.color;
                const existingCartItem = await db.Cart_item.findOne({
                    where: { cartId, productId, size, color },
                });
                if (existingCartItem) {
                    // Update quantity if item exists
                    await existingCartItem.update({ quantity });
                } else {
                    //   Create new cart item if it doesn't exist
                    await db.Cart_item.create({ cartId, productId, quantity, size, color });
                }
            }

            resolve({
                message: 'ok',
            });
        } catch (error) {
            reject(error);
        }
    });
