import * as services from '../services';
import { v2 as cloudinary } from 'cloudinary';

export const insertData = async (req, res) => {
    try {
        const response = await services.insertData(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
export const insertClothes = async (req, res) => {
    try {
        const image = req.file;

        const response = await services.insertClothes(req.body, image);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
