const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn , isNotLoggedIn} = require('../lib/auth');

router.get('/login', isNotLoggedIn, (req, res) =>{
    res.render('auth/login');
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash : true
    })(req, res, next);
});

router.get('/signIn', isNotLoggedIn, (req,res) =>{
    res.render('auth/signIn');
});

router.post('/signIn', passport.authenticate('local.signIn', {
    successRedirect: '/home',
    failureRedirect: '/signIn',
    failureFlash: true
}));

router.get('/home', isLoggedIn, (req,res) =>{
    res.render('home');
});


module.exports = router;