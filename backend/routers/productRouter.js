import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router(); // defines api routers for products
// get all data from database
productRouter.get('/', expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);
// get all products from data.js
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        console.log('insert');
        await Product.deleteMany({});
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
// create product
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'sample name ' + Date.now(),
            image: '/images/p1.png',
            quantity: 0,
            rating: 0,
            numReviews: 0,
            price: 0,
            category: 'category sample',
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
// update product by its id
productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.image = req.body.image;
            product.price = req.body.price;
            product.category = req.body.category;
            product.description = req.body.description;
            product.quantity = req.body.quantity;
            product.gender = req.body.gender;
            product.lensMaterial = req.body.lensMaterial;
            product.frameMaterial = req.body.frameMaterial;
            product.style = req.body.style;
            product.lensColor = req.body.lensColor;
            product.frameColor = req.body.frameColor;
            product.lensProtection = req.body.lensProtection;
            const updatedProduct = await product.save();
            res.send({ message: 'Product Updated', product: updatedProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);
// delete product by its id
productRouter.delete('/:id', isAuth, isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default productRouter;