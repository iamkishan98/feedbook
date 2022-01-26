const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

// GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}) );


router.get('/google/callback', passport.authenticate('google',{
        failureRedirect:'/'
    }), 
    
    (req,res)=>{
        res.redirect('/dashboard');
    }
);

// @desc    Logout user
// @route   auth/logout
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;