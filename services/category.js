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

export const updateCategory = ({ id, name }) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log('id, name', id, name);

            const response = await db.Category.update(
                { name },
                {
                    where: {
                        id,
                    },
                },
            );
            const isUpdated = response[0] === 1 ? true : false;
            resolve({
                err: isUpdated ? 0 : 1,
                message: isUpdated ? 'Successfully' : `Not found id = ${id}`,
                data: isUpdated,
            });
        } catch (error) {
            reject(error);
        }
    });
