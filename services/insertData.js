import db from '../models';

export const insertData = ({ name }) =>
    new Promise((resolve, reject) => {
        try {
            db.Category.create({
                name,
            });
            resolve({
                message: 'Ok',
            });
        } catch (error) {
            console.log(error);
        }
    });
