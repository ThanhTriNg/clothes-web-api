import Joi from 'joi';
import { userSchema } from '../helpers/joi_schema';
import { InternalServerError, badRequest } from '../middlewares/handle_error';
import * as services from '../services';
export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await services.getUser(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { error } = Joi.object(userSchema).validate(req.query);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.getAllUsers(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
