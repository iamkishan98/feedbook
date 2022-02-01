const express = require("express")
const router = express.Router();
const Stories = require('../models/Story');

// importing middlewares to check whether user is authenticated or not and redirecting to corresponding appropriate url's
const {ensureAuth, ensureGuest} = require('../middleware/auth');

// Login/Landing page
// GET 
router.get('/', ensureGuest ,(req,res)=>{
    res.render('Login', {
        layout : 'login'
    });
});

router.get('/dashboard', ensureAuth , async (req,res)=>{
    console.log(req.user.id);
    try{
        const story = await Stories.find({user: req.user.id}).lean();
        console.log(story);
        res.render('Dashboard',{ 
            name : req.user.firstName,
            stories : story
        });
    }
    catch(err){
        console.log(err.data);
        res.render('error/500');
    }
    
});

module.exports = router;