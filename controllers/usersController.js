module.exports = {
    signUp: async (req, res, next) => {
        // Email & Password
        // req.value.body
        console.log('contents of req.value.body', req.value.body);
        console.log("usersController signUp()!");
    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log("usersController signIn()!");
    },

    secret: async (req, res, next) => {
        console.log("usersController secret()!");
    }
}