import { Router } from 'express';
import knex from '../database/conection';

const locationsRouter = Router();

locationsRouter.get('/', async (request, response) => {
  const {
    nome,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  const location = {
    image: 'fake-image.jpg',
    nome,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  };

  const newIds = await knex('locations').insert(location);

  const locationId = newIds[0];

  const locationItens = items.map((item_id: number) => {
    return {
      item_id,
      location_id: locationId,
    };
  });

  await knex('location_items').insert(locationItens);

  return response.json({
    id: locationId,
    ...location,
  });
});

export default locationsRouter;
