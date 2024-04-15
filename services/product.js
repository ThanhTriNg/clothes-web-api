import db from '../models';
import { convertToSingleObject, convertToArray, simplifyData } from '../helpers/removeDuplicate';
export const getAllProduct = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Product.findAll({
                // attributes: {
                //     exclude: ['subCategoryId'],
                // },
                include: [
                    {
                        model: db.Sub_Category,
                        attributes: ['id', 'name', 'categoryId'],
                        include: [
                            {
                                model: db.Category,
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: db.Product_Gender,
                        attributes: ['id', 'genderId'],
                        include: [
                            {
                                model: db.Gender,
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                ],
            });

            // const transformData = (data) => {
            //     // const array = [...data];
            //     return data.map((product) => {
            //         const genderNames = product.Product_Genders.map((productGender) => productGender.Genders[0].name);
            //         return {
            //             Product_Genders: [
            //                 {
            //                     id: product.Product_Genders[0].id,
            //                     genderId: product.Product_Genders[0].genderId,
            //                     Genders: genderNames,
            //                 },
            //             ],
            //         };
            //     });
            // };

            resolve({
                data: response,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
