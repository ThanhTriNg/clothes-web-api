import Joi from 'joi';
import { order } from '../helpers/joi_schema';
import { badRequest } from '../middlewares/handle_error';
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
        return res.status(500).json({
            err: -1,
            message: 'Internal Server Error',
        });
    }
};
