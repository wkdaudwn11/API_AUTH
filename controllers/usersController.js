const JWT = require('jsonwebtoken');
const User = require('../models/usersModel');
const { JWT_SECRET } = require('../config/index');

// 토큰 설정
signToken = user => {
    return JWT.sign({
        iss: 'MyungJoo', // 발행자
        sub: user.id, // 제목
        iat: new Date().getTime(), // 현재 시간
        exp: new Date().setDate(new Date().getDate() + 1) // 유효시간은 24시간 (하루)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        // Email & Password
        // req.value.body
        // console.log('contents of req.value.body', req.value.body);
        // console.log("usersController signUp()!");

        const { email, password } = req.value.body;

        //Check if there is a user with the same email
        const foundUser = await User.findOne({email});
        if(foundUser) {
            return res.status(403).json({error: 'Email is already in use'});
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        // 토큰 발행
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ user: token });
    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log("usersController signIn()!");
    },

    secret: async (req, res, next) => {
        //console.log("usersController secret()!");
        console.log('I managed to get here!');
        res.json({ secret: "resource" });
    }
}