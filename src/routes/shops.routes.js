import { Router } from 'express';
import Shops from './../models/shops.model';
import productRouter from './products.routes';

const router = Router();

router.get('/:name', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});

    if (shop) res.json(shop);
    else res.status(404).send('Shop not found');
});

router.use(productRouter);

export default router;