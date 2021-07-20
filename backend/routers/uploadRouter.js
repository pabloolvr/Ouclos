import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    // set destination of file
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    // set name of file
    filename(req, file, cb) {
        cb(null, `${Date.now()}.png`);
    },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;