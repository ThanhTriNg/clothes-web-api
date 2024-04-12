import auth from './auth';
import clothes from './product';
import user from './user';
import insertData from './insertData';
import category from './category';
import { notFound } from '../middlewares/handle_error';
const initRoutes = (app) => {
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/clothes', clothes);
    app.use('/api/v1/users', user);
    app.use('/api/v1/insert', insertData);
    app.use('/api/v1/categories', category);

    app.use(notFound);
};

export default initRoutes;
