import db from '../models';

export const getUser = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password', 'role_code'],
                },
                include: [{ model: db.Role, attributes: ['id', 'code', 'value'] }],
            });

            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : 'Email not found',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getAllUserTU = (role_code) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findAll({
                where: { role_code },
            });

            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : 'Email not found',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
