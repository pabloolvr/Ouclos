import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await User.deleteMany({}); // remove all users from database
        const createdUsers = await User.insertMany(data.users); // insert pre-defined admin into database
        res.send({ createdUsers });
    })
);
// login request
userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // compare password received and password stored
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    cpf: user.cpf,
                    birthdate: user.birthdate,
                    address: user.address,
                    phone: user.phone,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user), // token to authenticate request
                });
                return;
            }
        }
        res.status(401).send({ message: 'email ou senha inválido' });
    })
);
// register request
userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            cpf: req.body.cpf,
            birthdate: req.body.birthdate,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8), // save the hashed password into the database
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            surname: createdUser.surname,
            cpf: createdUser.cpf,
            birthdate: createdUser.birthdate,
            address: createdUser.address,
            phone: createdUser.phone,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    })
);

export default userRouter;