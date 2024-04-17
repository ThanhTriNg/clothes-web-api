import { InternalServerError, badRequest } from '../middlewares/handle_error';
import * as services from '../services';
import Joi from 'joi';
import { authSchema } from '../helpers/joi_schema';
export const register = async (req, res) => {
    try {
        const { error } = Joi.object(authSchema).validate(req.body);

        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.register(req.body);
        return res.status(200).json({ response });
    } catch (error) {
        return InternalServerError(res);
    }
};

export const login = async (req, res) => {
    try {
        const { error } = Joi.object({
            email,
            password,
        }).validate(req.body);

        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.login(req.body);
        return res.status(200).json({
            response,
        });
    } catch (error) {
        return InternalServerError(res);
    }
};
