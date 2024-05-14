const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { userAuth }; 
