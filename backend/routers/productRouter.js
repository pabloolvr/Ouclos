import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router(); // defines api routers for products
// get all data from database
productRouter.get('/', expressAsyncHandler(async (req, res) => {
        const name = req.query.name || '';
        const category = req.query.category || '';
        const order = req.query.order || '';
        const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
        const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
        const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

        const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const categoryFilter = category ? { category } : {};

        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
        const ratingFilter = rating ? { rating: { $gte: rating } } : {};
        const sortOrder =
        order === 'lowest'
            ? { price: 1 }
            : order === 'highest'
            ? { price: -1 }
            : order === 'toprated'
            ? { rating: -1 }
            : { _id: -1 };

        const products = await Product.find({
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        }).populate('').sort(sortOrder);
        res.send(products);
    })
);
// get categories of products
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
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
// post a review for a product
productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.reviewerId === req.user._id)) {
                return res.status(400).send({ message: 'Você já fez uma avaliação para este produto.' });
            }
            const review = {
                reviewerId: req.user._id,
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            // store review of product
            product.reviews.push(review);
            // update numReviews of product
            product.numReviews = product.reviews.length;
            // calculate rating of product
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default productRouter;