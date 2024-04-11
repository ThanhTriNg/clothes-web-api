import auth from './auth';
import clothes from './product';
import user from './user';
import { notFound } from '../middlewares/handle_error';
const initRoutes = (app) => {
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/clothes', clothes);
    app.use('/api/v1/users', user);

    app.use(notFound);
};

export default initRoutes;
