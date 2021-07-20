import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();
// get all orders
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({}).populate('user', 'name');
        res.send(orders);
    })
);
// find orders by user
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

// post order
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Carrinho está vazio' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
                isPaid: true,
                paidAt: Date.now(),
            });
            // create order
            const createdOrder = await order.save();
            // store order
            res.status(201).send({ message: 'New Order Created', order: createdOrder });
        }
    })
);

// get order
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
        // find order in database
        //console.log('idOrder: ' + req.params.id);
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
            res.status(401).send({req});
        }
    console.log('from get order ' + req.params.id);
    })
);

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    // find order in database
    console.log('idOrder: ' + req.params.id);
    const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            /*
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };*/
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
            res.status(401).send(req);
        }
        console.log('from pay order');
    })
);

export default orderRouter;