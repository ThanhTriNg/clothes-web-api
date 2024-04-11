import { unAuth } from './handle_error';

export const isAdmin = (req, res, next) => {
    const [role_code] = req.user;
    if (role_code !== 'T1') return unAuth('Require role Admin', res);
    next();
};
