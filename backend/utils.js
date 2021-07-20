import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret', // encrypt data and generated token
        {
            expiresIn: '30d',
        }
    );
};
// verify user authentication
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    //console.log('authorization: ' + authorization);
    if (authorization) {
        // get token from request
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        // verify token
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    req.user = decode; // store user information in req
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token'});
    }
};
// verify admin authentication
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};
