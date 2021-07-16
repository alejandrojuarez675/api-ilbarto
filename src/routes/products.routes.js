import { Router } from 'express';
import Shops from './../models/shops.model';

const router = Router();

router.get('/:name/products', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});

    if (shop) res.json(shop.products);
    else res.status(404).send('Shop not found');
});

router.post('/:name/products', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});
    if (!shop) { res.status(404).send('Shop not found'); return;}

    const products = [...shop.products];
    products.push(req.body);

    try {
        await Shops.updateOne({ _id: shop._id }, { $set: { products }});
        res.json(products);
    } catch (error) {
        res.status(500).send('Have a problem with the create');
    }
});

router.get('/:name/products/:idProduct', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});
    if (!shop) { res.status(404).send('Shop not found'); return;}

    const products = [...shop.products];
    const productById = products.find(x => x._id == req.params.idProduct);
    if (!productById) { res.status(404).send('Product not found'); return;}

    res.json(productById);
});

router.put('/:name/products/:idProduct', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});
    if (!shop) { res.status(404).send('Shop not found'); return;}

    const products = [...shop.products];
    const productToUpdate = products.find(x => x._id == req.params.idProduct);
    if (!productToUpdate) { res.status(404).send('Product not found'); return;}

    const updatedProducts = products
        .filter(x => x._id != req.params.idProduct);
    updatedProducts.push(req.body);

    try {
        await Shops.updateOne({ _id: shop._id }, { $set: { products: updatedProducts }});
        res.json(req.body);
    } catch (error) {
        res.status(500).send('Have a problem with the update');
    }
});

router.delete('/:name/products/:idProduct', async (req, res) => {
    const shop = await Shops.findOne({name: req.params.name});
    if (!shop) { res.status(404).send('Shop not found'); return;}

    const products = [...shop.products];
    const productToDelete = products.find(x => x._id == req.params.idProduct);
    if (!productToDelete) { res.status(404).send('Product not found'); return;}

    const updatedProducts = products
        .filter(x => x._id != req.params.idProduct);

    try {
        await Shops.updateOne({ _id: shop._id }, { $set: { products: updatedProducts }});
        res.status(204).send('ok');
    } catch (error) {
        res.status(500).send('Have a problem with the update');
    }
});

export default router;