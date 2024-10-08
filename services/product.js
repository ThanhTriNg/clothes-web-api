import db from '../models';
import { Op } from 'sequelize';
import { generatePaginationAndSortQueries } from '../helpers/servicesQueries';
import { v2 as cloudinary } from 'cloudinary';
import { getFileNameFromUrl } from '../helpers/cloudinary';

export const getAllProducts = ({
    page = process.env.PAGE,
    pageSize = process.env.PAGE_SIZE,
    sort,
    order,
    name,
    subCategoryId,
    minPrice,
    maxPrice,
    key,
    ...query
}) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log('key>>', key);
            if (name) query.name = { [Op.substring]: name };
            if (minPrice && maxPrice) query.price = { [Op.between]: [minPrice, maxPrice] };
            if (subCategoryId) {
                const subCateArray = subCategoryId.split(',').map(Number);
                query.subCategoryId = { [Op.or]: [subCateArray] };
            }
            const { queries, attributes } = generatePaginationAndSortQueries(page, pageSize, sort, order, key);

            const { count, rows } = await db.Product.findAndCountAll({
                attributes: { ...attributes, exclude: ['isDeleted'] },
                where: { ...query, isDeleted: false },
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
                ],
            });

            const totalCount = parseInt(count);
            const totalPages = Math.ceil(totalCount / pageSize);
            resolve({
                data: rows,
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalPages,
                totalCount,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getProduct = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Product.findOne({
                where: { id },
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
                ],
            });
            console.log('response>>', response);

            resolve({
                err: response ? 0 : 1,
                message: response ? 'Successfully' : `Not found id = ${id}`,
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const createProduct = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            // let imageUrl;
            // let subImageUrls;

            // if (image) {
            //     imageUrl = image[0]?.path;
            // }

            // if (images) {
            //     subImageUrls = images?.map((obj) => obj.path);
            // }
            console.log('body>>', body);

            const response = await db.Product.findOrCreate({
                where: { name: body?.name },
                defaults: body,
            });
            const isCreate = response[1] ? true : false;
            resolve({
                err: isCreate ? 0 : 1,
                message: isCreate ? 'Created' : 'Product name already exists',
            });
            // if (image && isCreate === false) cloudinary.uploader.destroy(image.filename);
            // if (image && isCreate === false)
            //     cloudinary.uploader.destroy(image.filename, (err, res) => {
            //         //  console.log('cloudinary err>>', err);
            //         //  console.log('image.filename', image.filename);
            //         //  console.log('cloudinary res>>', res);
            //     });
        } catch (error) {
            // if (image) cloudinary.uploader.destroy(image.filename);
            reject(error);
        }
    });

export const updateProduct = (body, id) =>
    new Promise(async (resolve, reject) => {
        try {
            // let imageUrl;
            // let subImageUrls;

            // console.log('imageUrl', imageUrl);
            // console.log('subImageUrls', subImageUrls);
            // if (image) {
            //     imageUrl = image[0]?.path;
            // }

            // if (images) {
            //     subImageUrls = images?.map((obj) => obj.path);
            // }
            const response = await db.Product.update(
                { ...body },
                // { ...body },
                {
                    where: {
                        id,
                    },
                },
            );
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

// export const deleteProduct = (id) =>
//     new Promise(async (resolve, reject) => {
//         try {
//             const responseFindOne = await db.Product.findOne({
//                 where: {
//                     id,
//                 },
//             });
//             const oldImgUrl = responseFindOne?.imageUrl;

//             if (oldImgUrl) {
//                 const fileName = getFileNameFromUrl(oldImgUrl);
//                 await cloudinary.uploader.destroy(fileName);
//             }

//             const response = await db.Product.destroy({
//                 where: {
//                     id,
//                 },
//             });
//             const isDelete = response ? true : false;
//             resolve({
//                 err: isDelete ? 0 : 1,
//                 message: isDelete ? 'Successfully' : `Not found id = ${id}`,
//                 data: isDelete,
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });

export const deleteProduct = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            // const responseFindOne = await db.Product.findOne({
            //     where: {
            //         id,
            //     },
            // });
            // const oldImgUrl = responseFindOne?.imageUrl;

            // if (oldImgUrl) {
            //     const fileName = getFileNameFromUrl(oldImgUrl);
            //     await cloudinary.uploader.destroy(fileName);
            // }

            // const response = await db.Product.destroy({
            //     where: {
            //         id,
            //     },
            // });
            // const isDelete = response ? true : false;
            const response = await db.Product.update(
                { isDeleted: true },
                // { ...body },
                {
                    where: {
                        id,
                    },
                },
            );

            resolve({
                err: response[0] ? 0 : 1,
                message: response[0] ? 'Successfully' : `Not found id = ${id}`,
            });
        } catch (error) {
            reject(error);
        }
    });
