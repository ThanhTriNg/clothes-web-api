import db from '../models';

// export const createCartItem = (userId) =>
//     new Promise(async (resolve, reject) => {
//         try {
//             const response = await db.Cart.findOrCreate({
//                 where: { userId },
//             });
//             console.log(response);
//             resolve({
//                 response,
//                 err: response[1] ? 0 : 1,
//                 message: response[1] ? 'Create cart' : 'Cart exist',
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });

export const getCartItem = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Cart_item.findAll();

            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : `Not found `,
                data: response,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
