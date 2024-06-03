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
            if (name) query.name = { [Op.substring]: name };
            if (minPrice && maxPrice) query.price = { [Op.between]: [minPrice, maxPrice] };
            if (subCategoryId) {
                const subCateArray = subCategoryId.split(',').map(Number);
                query.subCategoryId = { [Op.or]: [subCateArray] };
            }
            const { queries, attributes } = generatePaginationAndSortQueries({
                page,
                pageSize,
                sort,
                order,
                key,
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
            // console.log(error);(error);
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

            resolve({
                message: response ? 'Successfully' : `Not found id = ${id}`,
                data: response,
            });
        } catch (error) {
            // console.log(error);(error);
            reject(error);
        }
    });

export const createProduct = (body, image, images) =>
    new Promise(async (resolve, reject) => {
        try {
            // // console.log(error);('image, images>>>', image, images);
            let subImageUrls;
            let imageUrl;
            // // console.log(error);('image service', image);
            // // console.log(error);('images service', images);
            if (image) {
                imageUrl = image[0]?.path;
            }

            if (images) {
                subImageUrls = images?.map((obj) => obj.path);
            }
            // console.log(error);('imageUrl>>', imageUrl);
            // console.log(error);('subImageUrls>>', subImageUrls);
            const response = await db.Product.findOrCreate({
                where: { name: body?.name },
                defaults: {
                    ...body,
                    imageUrl,
                    subImageUrls,
                },
            });
            const isCreate = response[1] ? true : false;
            resolve({
                err: isCreate ? 0 : 1,
                message: isCreate ? 'Created' : 'Product name already exists',
            });
            // if (image && isCreate === false) cloudinary.uploader.destroy(image.filename);
            if (image && isCreate === false)
                cloudinary.uploader.destroy(image.filename, (err, res) => {
                    // // console.log(error);('cloudinary err>>', err);
                    // // console.log(error);('image.filename', image.filename);
                    // // console.log(error);('cloudinary res>>', res);
                });
        } catch (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            // console.log(error);(error);
            reject(error);
        }
    });

export const updateProduct = (body, id, image, images) =>
    new Promise(async (resolve, reject) => {
        try {
            const responseFindOne = await db.Product.findOne({
                where: { id },
            });
            // console.log(error);('body.colors>', body.colors);
            const oldImgUrl = responseFindOne?.imageUrl;

            if (oldImgUrl) {
                const fileName = getFileNameFromUrl(oldImgUrl);
                await cloudinary.uploader.destroy(fileName);
            }

            let imageUrl;
            let subImageUrls;
            if (image) {
                imageUrl = image[0]?.path;
            }

            if (images) {
                subImageUrls = images?.map((obj) => obj.path);
            }
            const response = await db.Product.update(
                { ...body, imageUrl, subImageUrls },
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
            if (image && isUpdated === false) cloudinary.uploader.destroy(image.filename);
        } catch (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            // console.log(error);(error);
            reject(error);
        }
    });

export const deleteProduct = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const responseFindOne = await db.Product.findOne({
                where: {
                    id,
                },
            });
            const oldImgUrl = responseFindOne?.imageUrl;

            if (oldImgUrl) {
                const fileName = getFileNameFromUrl(oldImgUrl);
                await cloudinary.uploader.destroy(fileName);
            }

            const response = await db.Product.destroy({
                where: {
                    id,
                },
            });
            const isDelete = response ? true : false;
            resolve({
                err: isDelete ? 0 : 1,
                message: isDelete ? 'Successfully' : `Not found id = ${id}`,
                data: isDelete,
            });
        } catch (error) {
            // console.log(error);(error);
            reject(error);
        }
    });
