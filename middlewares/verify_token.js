import { verify } from 'jsonwebtoken';
import { unAuth } from './handle_error';
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return unAuth('Require authorization', res);
    }
    const accessToken = token.split(' ')[1];
    verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        // console.log(error);(err);
        if (err) return unAuth('Access token maybe expired or invalid', res);
        req.user = user;
        // console.log('req.user>>', req.user);
        next();
    });
};
