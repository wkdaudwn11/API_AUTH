const express = require('express');
const router = require('express-promise-router')();

const passport = require('passport');
const passportConf = require('../passport');

const usersController = require('../controllers/usersController');

const { validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/signup')
    // Joi의 validateBody, schemas를 사용하여 값 검증 후 컨트롤러로 이동.
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(usersController.signIn);
    //.post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), usersController.signIn);

// router.route('/oauth/google')
//     .post(passport.authenticate('googleToken', { session: false }), usersController.googleOAuth);
router.route('/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), usersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), usersController.facebookOAuth);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), usersController.secret);

module.exports = router;