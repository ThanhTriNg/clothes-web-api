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

export const insertClothes = ({ name, price, description, descriptionSort, sizes, colors, subCategoryId }) =>
    new Promise((resolve, reject) => {
        try {
            db.Product.create({
                name,
                price,
                description,
                descriptionSort,
                sizes,
                colors,
                subCategoryId,
            });
            resolve({
                message: 'Ok',
            });
        } catch (error) {
            console.log(error);
        }
    });
