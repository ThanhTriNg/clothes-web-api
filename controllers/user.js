import * as services from '../services';
import { InternalServerError, badRequest } from '../middlewares/handle_error';

export const getCurrentUser = async (req, res) => {
    try {
        console.log(req.user);
        const { id } = req.user;
        const response = await services.getUser(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const getAllUserTU = async (req, res) => {
    try {
        const response = await services.getAllUserTU('TU');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
