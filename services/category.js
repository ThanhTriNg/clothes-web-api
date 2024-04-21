import db from '../models';

//categories
export const getAllCategories = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.findAll({
                include: [{ model: db.Sub_Category, attributes: ['id', 'name'] }],
          
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

export const getCategory = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.findOne({
                where: { id },
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

export const createCategory = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.findOrCreate({
                where: { name: body?.name },
                defaults: body,
            });

            const isCreate = response[1] ? true : false;
            resolve({
                err: isCreate ? 0 : 1,
                message: isCreate ? 'Created' : 'Categories name already exists',
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

export const deleteCategory = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Category.destroy({
                where: {
                    id,
                },
            });
            console.log(response);

            const isDelete = response ? true : false;
            resolve({
                err: isDelete ? 0 : 1,
                message: isDelete ? 'Successfully' : `Not found id = ${id}`,
                data: isDelete,
            });
        } catch (error) {
            reject(error);
        }
    });
