import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();
// get all data from database
productRouter.get('/', expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);
// get all products from data.js
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);
// get product from id
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Produto não encontrado' });
        }
    })
);

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'samle name ' + Date.now(),
            image: '/images/p1.png',
            quantity: 0,
            rating: 0,
            numReviews: 0,
            price: 0,
            gender: 'gender sample',
            lensMaterial: 'lens material sample',
            frameMaterial: 'frame material sample',
            style: 'style sample',
            lensColor: 'lens color sample',
            frameColor: 'frame color sample',
            lensProtection: 'lens protection sample',
            description: 'description sample',
        });
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', product: createdProduct });
    })
);

export default productRouter;