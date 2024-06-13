import db from '../models';

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
            reject(error);
        }
    });
