import Joi from 'joi';
import { userRoleSchema, userSchema } from '../helpers/joi_schema';
import { InternalServerError, badRequest } from '../middlewares/handle_error';
import * as services from '../services';
export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await services.getUser(id);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);(error);
        return InternalServerError(res);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { error } = Joi.object(userRoleSchema).validate(req.query);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.getAllUsers(req.query);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);
        return InternalServerError(res);
    }
};

export const updateUser = async (req, res) => {
    try {
        console.log('req.user controllers>>', req.user.id);
        const { error } = Joi.object(userSchema).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.updateUser(req.body, req.user.id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
