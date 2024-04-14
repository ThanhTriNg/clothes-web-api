import db from '../models';

export const getAllCategories = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.findAll({
                include: [{ model: db.Sub_Category, attributes: ['id', 'name'] }],
            });

            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : 'Not found',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
