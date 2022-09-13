const express = require('express');
const router = express.Router();
const passport = require('passport');
const CatchAsyncError = require('../utilities/catchAsyncError');

const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegisterForm)
    .post(CatchAsyncError(users.createUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router