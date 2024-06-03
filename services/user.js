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

export const getAllUsers = ({ roleCode }) =>
    new Promise(async (resolve, reject) => {
        const isRoleCode = roleCode ? { roleCode } : null;
        try {
            const response = await db.User.findAll({
                where: isRoleCode,
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

export const updateUser = (body, id) =>
    new Promise(async (resolve, reject) => {
        console.log('services body>>', body);
        console.log('services id>>',id);
        try {
            const response = await db.User.update(body, {
                where: {
                    id,
                },
            });

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
