const express = require("express")
const router = express.Router();

// importing middlewares to check whether user is authenticated or not and redirecting to corresponding appropriate url's
const {ensureAuth, ensureGuest} = require('../middleware/auth');

// Login/Landing page
// GET 
router.get('/', ensureGuest ,(req,res)=>{
    res.render('Login', {
        layout : 'login'
    });
});

router.get('/dashboard', ensureAuth ,(req,res)=>{
    res.render('Dashboard',{
        layout: 'main'
    });
});

module.exports = router;