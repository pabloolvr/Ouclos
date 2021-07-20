import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

// insert pre-defined data in backend db
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        //await User.deleteMany({}); // remove all users from database
        const createdUsers = await User.insertMany(data.users); // insert pre-defined admin into database
        res.send({ createdUsers });
    })
);
// login request
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
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
                    publicPlace: user.publicPlace,
                    publicPlaceNumber: user.publicPlaceNumber,
                    neighborhood: user.neighborhood,
                    city: user.city,
                    state: user.state,
                    postalCode: user.postalCode,
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
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            cpf: req.body.cpf,
            birthdate: req.body.birthdate,
            publicPlace: req.body.publicPlace,
            publicPlaceNumber: req.body.publicPlaceNumber,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
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
            publicPlace: createdUser.publicPlace,
            publicPlaceNumber: createdUser.publicPlaceNumber,
            neighborhood: createdUser.neighborhood,
            city: createdUser.city,
            state: createdUser.state,
            postalCode: createdUser.postalCode,
            phone: createdUser.phone,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    })
);
// get data of a user by its id
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);
// update data from a user
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            // update personal data
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname; 
            user.cpf = req.body.cpf || user.cpf;
            user.birthdate = req.body.birthdate || user.birthdate;
            user.phone = req.body.phone || user.phone;
            user.email = req.body.email || user.email;
            // update address
            user.publicPlace = req.body.publicPlace || user.publicPlace;
            user.publicPlaceNumber = req.body.publicPlaceNumber || user.publicPlaceNumber;
            user.neighborhood = req.body.neighborhood || user.neighborhood;
            user.city = req.body.city || user.city;
            user.state = req.body.state || user.state;
            user.postalCode = req.body.postalCode || user.postalCode;
            // update password if user has changed it on update page
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                surname: updatedUser.suranme,
                cpf: updatedUser.cpf,
                birthdate: updatedUser.birthdate,
                phone: updatedUser.phone,
                email: updatedUser.email,
                publicPlace: updatedUser.publicPlace,
                publicPlaceNumber: updatedUser.publicPlaceNumber,
                neighborhood: updatedUser.neighborhood,
                city: updatedUser.city,
                state: updatedUser.state,
                postalCode: updatedUser.postalCode,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
    })
);
// get data of all users
userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const users = await User.find({});
        res.send(users);
    })
);
// delete user by id
userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'admin@example.com') {
                res.status(400).send({ message: 'Não é possível remover este admin' });
                return;
            }
            const deleteUser = await user.remove();
            res.send({ message: 'User Deleted', user: deleteUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);
// edit an user by id
userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isAdmin = req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;
            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);

export default userRouter;