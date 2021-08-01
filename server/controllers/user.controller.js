const { Users } = require('../models/product.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv')

const makeJwt = (id) => {
    return jwt.sign( { id },
        process.env.MY_SECRET_KEY);
};
const sendToken = (user, statusCode, req, res) => {
    const userToken = makeJwt(user._id);
    res.cookie('userToken', userToken)
    res.status(statusCode).json({
        message: "Success",
        userToken,
        user
    });
};

module.exports.register = (req, res) => {
    Users.exists({email: req.body.email} || {username: req.body.username})
        .then(userExists => {
            if (userExists) {
                return Promise.reject(new Error('A user with this email or username exists'))
                    .then(msg => {
                        res.json(msg)
                    })
                    .catch(()=>res.json(Error))
            }
            Users.create(req.body)
                .then(user => {
                    user.password = null
                    sendToken(user, 201, req, res);
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
}

module.exports.logIn = async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if(user === null) {
        console.log("wrong email")
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    user.password = null
    correctPassword 
        ? sendToken(user, 200, req, res)
        : console.log('incorrect password');
};

module.exports.logOut = async(req, res) => {
    res.clearCookie("userToken");
    res.sendStatus(200);
}