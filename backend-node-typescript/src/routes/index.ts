import { Router } from 'express';
import itemsRoutes from './items_routes';
import locationsRouter from './locations_routes';

const routes = Router();

routes.use('/items', itemsRoutes);
routes.use('/locations', locationsRouter);

export default routes;
