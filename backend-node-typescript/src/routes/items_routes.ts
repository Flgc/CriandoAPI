import { Router } from 'express';
import knex from '../database/conection';

const itemsRoutes = Router();

itemsRoutes.get('/', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json({ serializedItems });
});

export default itemsRoutes;
