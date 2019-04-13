const User = require('../models/usersModel');

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

        // Respond with token
        res.status(200).json({ user: 'created' });
    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log("usersController signIn()!");
    },

    secret: async (req, res, next) => {
        console.log("usersController secret()!");
    }
}