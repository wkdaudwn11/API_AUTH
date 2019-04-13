const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/usersController');

router.route('/signup')
    .post(usersController.signUp);

router.route('/signin')
    .post(usersController.signIn);

router.route('/secret')
    .get(usersController.secret);

module.exports = router;