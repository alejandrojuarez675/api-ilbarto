import { Router } from 'express';
import Shops from './../models/shops.model';

const router = Router();

router.get('/:name', async (req, res, _next) => {
    const shop = await Shops.findOne({name: req.params.name});

    if (shop) res.json(shop);
    else res.status(404).send('Shop not found');
});

export default router;