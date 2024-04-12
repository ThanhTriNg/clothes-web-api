import * as services from '../services';

export const insertData = async (req, res) => {
    try {
        const response = await services.insertData(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
