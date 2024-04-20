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
