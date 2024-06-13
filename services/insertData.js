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
        }
    });

export const insertClothes = (body, image) =>
    new Promise((resolve, reject) => {
        try {
            db.Product.create({
                ...body,
                imageUrl: image?.path,
            });
            resolve({
                message: 'Ok',
            });
        } catch (error) {
        }
    });
