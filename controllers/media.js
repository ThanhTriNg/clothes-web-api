import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

export const getMedia = async (req, res) => {
    try {
        const response = await services.getMedia(req.query.nextCursor);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};

export const uploadImage = async (req, res) => {
    try {
        const images = req.files;
        const response = await services.uploadImage(images.ImageUrls);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
