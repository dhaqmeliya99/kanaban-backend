const jwt = require('jsonwebtoken');
const User = require("../models/user")

exports.getToken = (user) => {
    const payload = {
        user: {
            id: user._id,
            email: user.email,
        },
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    return token
    
};