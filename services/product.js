import db from '../models';
import url from 'url';
import { Op } from 'sequelize';
export const getAllProduct = ({
    page = process.env.PAGE,
    pageSize = process.env.PAGE_SIZE,
    sort,
    order,
    name,
    ...query
}) =>
    new Promise(async (resolve, reject) => {
        try {
            //custom
            // const parsedQueryParams = url.parse(queryParams, true).query;
            // const customAttributes = Object.keys(parsedQueryParams);
            // const attributes = customAttributes.length > 0 ? customAttributes : null;
            // custom;

            const queries = {};
            const offset = (page - 1) * pageSize;
            queries.offset = +offset;
            queries.limit = +pageSize;
            if (sort && !order) {
                queries.order = [sort];
            } else {
                queries.order = [[sort, order]];
            }
            
            console.log('queries.order>>>', queries.order);
            if (name) query.name = { [Op.substring]: name };

            const { count, rows } = await db.Product.findAndCountAll({
                // attributes: {
                //     exclude: ['subCategoryId'],
                // },
                // attributes: attributes,

                where: query,
                ...queries,

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
            const totalCount = count;
            const totalPages = Math.ceil(totalCount / pageSize);
            resolve({
                data: rows,
                currentPage: page,
                pageSize,
                totalPages,
                totalCount,
                test: queries,
            });
        } catch (error) {
            // console.log(error);
            reject(error);
        }
    });
