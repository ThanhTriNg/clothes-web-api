import db from '../models';

export const createCart = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Cart.findOrCreate({
                where: { userId },
            });
            console.log(response);
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
            console.log(response);
            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : `Not found `,
                data: response,
            });
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });

//cart_item cartItem
export const addItemIntoCart = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            // // console.log(body);
            // // const responseCart = await db.Cart.findOne({
            // //     where: { userId },
            // //     include: [{ model: db.Cart_item }],
            // // });
            // // console.log(responseCart);
            // const findOrCreateCart = await db.Cart.findOrCreate({
            //     where: { userId },
            //     include: [{ model: db.Cart_item }],
            // });
            // const cartId = findOrCreateCart[0].id;

            // //findOrCreateCart[1] return boolean create or not, true = create, false = exist
            // if (findOrCreateCart[1]) {
            //     body.forEach(async (element) => {
            //         //add new cartItem into cart
            //         await db.Cart_item.create({
            //             productId: element.product.id,
            //             cartId,
            //         });
            //     });
            // } else {
            //     //delete all item have cartId
            //     await db.Cart_item.destroy({
            //         where: { cartId },
            //     });

            //     body.forEach(async (element) => {
            //         //add new cartItem into cart
            //         await db.Cart_item.create({
            //             productId: element.product.id,
            //             cartId,
            //         });
            //     });
            // }

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
                    console.log(quantity);
                    // Update quantity if item exists
                    await existingCartItem.update({ quantity });
                } else {
                    //   Create new cart item if it doesn't exist
                    await db.Cart_item.create({ cartId, productId, quantity, size, color });
                }
            }

            console.log(newItemsIdentifiers);
            resolve({
                message: 'ok',
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
