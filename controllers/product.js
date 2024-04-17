import Joi, { object } from 'joi';
import { productSchema, order } from '../helpers/joi_schema';
import { badRequest, InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

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
        const { error } = Joi.object(productSchema).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.createProduct(req.body, image);
        // return res.status(200).json('ok');
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
