import Joi, { object } from 'joi';
import { productSchema, order, updateProductSchema } from '../helpers/joi_schema';
import { badRequest, InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

import { v2 as cloudinary } from 'cloudinary';

export const getAllProduct = async (req, res) => {
    try {
        const { error } = Joi.object({
            order,
        }).validate({ order: req.query.order });
        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.getAllProduct(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};

export const createProduct = async (req, res) => {
    try {
        const image = req.file;
        const { error } = Joi.object(productSchema).validate({ ...req.body, imageUrl: image?.path });
        if (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            return badRequest(error.details[0].message, res);
        }

        const response = await services.createProduct(req.body, image);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const image = req.file;
        const id = req.params.id;
        console.log('image>', image);

        const { error } = Joi.object(updateProductSchema).validate({ ...req.body, imageUrl: image?.path });
        if (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            return badRequest(error.details[0].message, res);
        }
        const response = await services.updateProduct(req.body, id, image);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
