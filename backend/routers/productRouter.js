import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();
// get all data from database
productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);
// get all products from data.js
productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);
// get product from id
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Produto não encontrado' });
        }
    })
);

export default productRouter;