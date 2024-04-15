import db from '../models';

export const getAllProduct = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Product.findAll({
                attributes: {
                    exclude: ['subCategoryId'],
                },
                include: [{ model: db.Sub_Category }],
                include: [{ model: db.Product_Gender, attributes: ['id', 'productId', 'genderId'] }],
            });
            resolve({
                data: response,
                test: response.Product_Genders
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
