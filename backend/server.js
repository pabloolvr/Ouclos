import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();
app.use(express.json()); // parse json data in the body of request
app.use(express.urlencoded({ extended: true }));
// connect to mongodb
mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://pablo:pablosenha@cluster0.nl6th.mongodb.net/ouclos?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
// api routers used
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
// return project folder
const __dirname = path.resolve();
// access upload folder in project folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
/*
app.get('/', (req, res) => {
    res.send('Server is ready');
});
*/
// error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
// get port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});