import db from '../models';
import url from 'url';
import { Op } from 'sequelize';
import { generatePaginationAndSortQueries } from '../helpers/servicesQueries';
export const getAllProduct = ({
    page = process.env.PAGE,
    pageSize = process.env.PAGE_SIZE,
    sort,
    order,
    name,
    key,
    ...query
}) =>
    new Promise(async (resolve, reject) => {
        try {
            if (name) query.name = { [Op.substring]: name };

            const { queries, attributes } = generatePaginationAndSortQueries({
                page,
                pageSize,
                sort,
                order,
                key,
                query,
            });

            const { count, rows } = await db.Product.findAndCountAll({
                attributes: attributes,

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

            const totalCount = count;
            const totalPages = Math.ceil(totalCount / pageSize);
            resolve({
                data: rows,
                currentPage: page,
                pageSize,
                totalPages,
                totalCount,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
