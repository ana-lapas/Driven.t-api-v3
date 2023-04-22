import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotels, getHotelsById } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).post('/:hotelId', getHotelsById);

export { hotelsRouter };
