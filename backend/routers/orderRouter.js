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
// get order by id
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
        // find order in database
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);
// delete order by id
orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 'Order Deleted', order: deleteOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);
// deliver order by id
orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

export default orderRouter;