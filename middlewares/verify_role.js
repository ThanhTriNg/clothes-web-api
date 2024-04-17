import { unAuth } from './handle_error';

export const isAdmin = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== 'TA') return unAuth('Require role Admin', res);
    next();
};
