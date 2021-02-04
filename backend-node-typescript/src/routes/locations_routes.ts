import { Router, response } from 'express';
import knex from '../database/conection';

const locationsRouter = Router();

locationsRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  const location = {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  };

  const transaction = await knex.transaction();

  const newIds = await transaction('locations').insert(location);

  const location_id = newIds[0];

  const locationItens = items.map(async (item_id: number) => {
    const selectedItem = await transaction('items')
      .where('id', item_id)
      .first();

    if (!selectedItem) {
      return response.status(400).json({ message: 'Item not Found.' });
    }

    return {
      item_id,
      location_id,
    };
  });

  await transaction('location_items').insert(locationItens);

  await transaction.commit();

  return response.json({
    id: location_id,
    ...location,
  });
});

locationsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const location = await knex('locations').where('id', id).first();

  if (!location) {
    return response.status(400).json({ message: 'Location not found.' });
  }

  const items = await knex('items')
    .join('location_items', 'items.id', '=', 'location_items.item_id')
    .where('location_items.location_id', id)
    .select('items.title');

  return response.json({ location, items });
});

export default locationsRouter;
