import Joi from 'joi';
import { order, productSchema, updateProductSchema } from '../helpers/joi_schema';
import { InternalServerError, badRequest } from '../middlewares/handle_error';
import * as services from '../services';

import { v2 as cloudinary } from 'cloudinary';

export const getAllProducts = async (req, res) => {
    try {
        const { error } = Joi.object({
            order,
        }).validate({ order: req.query.order });
        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.getAllProducts(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.getProduct(id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};

export const createProduct = async (req, res) => {
    try {
        const images = req.files;

        const { error } = Joi.object(productSchema).validate({ ...req.body });
        if (error) {
            if (images.imageUrl) {
                images.imageUrl.forEach((img) => {
                    cloudinary.uploader.destroy(img.filename);
                });
            }
            if (images.subImageUrls) {
                images.subImageUrls.forEach((img) => {
                    cloudinary.uploader.destroy(img.filename);
                });
            }
            return badRequest(error.details[0].message, res);
        }

        const response = await services.createProduct(req.body, images.imageUrl, images.subImageUrls);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const images = req.files;
        const id = req.params.id;
        const { error } = Joi.object(productSchema).validate({ ...req.body });
        if (error) {
            if (images.imageUrl) {
                images.imageUrl.forEach((img) => {
                    cloudinary.uploader.destroy(img.filename);
                });
            }
            if (images.subImageUrls) {
                images.subImageUrls.forEach((img) => {
                    cloudinary.uploader.destroy(img.filename);
                });
            }
            return badRequest(error.details[0].message, res);
        }
        const response = await services.updateProduct(req.body, id, images.imageUrl, images.subImageUrls);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await services.deleteProduct(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
