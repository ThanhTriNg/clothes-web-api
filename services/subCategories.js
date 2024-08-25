import { generatePaginationAndSortQueries } from '../helpers/servicesQueries';
import db from '../models';

//sub categories
export const getAllSubCategories = ({
    page = process.env.PAGE,
    pageSize = process.env.PAGE_SIZE,
    sort,
    order,
    name,
    minPrice,
    maxPrice,
    key,
    ...query
}) =>
    new Promise(async (resolve, reject) => {
        try {
            const { queries, attributes } = generatePaginationAndSortQueries(page, pageSize, sort, order, key);
            const response = await db.Sub_Category.findAll({
                attributes: attributes,
                where: query,
                ...queries,
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

export const getSubCategory = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Sub_Category.findOne({
                where: { id },
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

export const createSubCategory = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Sub_Category.findOrCreate({
                where: { name: body?.name },
                defaults: body,
            });

            const isCreate = response[1] ? true : false;
            resolve({
                err: isCreate ? 0 : 1,
                message: isCreate ? 'Created' : 'Sub categories name already exists',
            });
        } catch (error) {
            reject(error);
        }
    });
