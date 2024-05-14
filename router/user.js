const router = require("express").Router();
const passport = require('passport'); 
require('../passport');

router.use(passport.initialize()); 
router.use(passport.session());

const userController = require('../controller/user');

router.get('/', userController.loadAuth);
router.get('/auth/google' , passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get( '/auth/google/callback', passport.authenticate( 'google', { successRedirect: '/success', failureRedirect: '/failure'}));
router.get('/success' , userController.successGoogleLogin);
router.get('/failure' , userController.failureGoogleLogin);


module.exports = router;