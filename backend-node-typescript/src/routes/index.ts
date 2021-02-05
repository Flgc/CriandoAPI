import { Router } from 'express';
import itemsRoutes from './items_routes';
import locationsRouter from './locations_routes';
import usersRouter from './users_routes';
import sessionsRouter from './sessions_routes';

const routes = Router();

routes.use('/items', itemsRoutes);
routes.use('/locations', locationsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
