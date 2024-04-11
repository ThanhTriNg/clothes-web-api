import createHttpError from 'http-errors';

export const badRequest = (err, res) => {
    const error = createHttpError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    });
};

export const InternalServerError = (res) => {
    const error = createHttpError.InternalServerError();
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    });
};

export const notFound = (req, res) => {
    const error = createHttpError.NotFound('This route is not define');
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    });
};
