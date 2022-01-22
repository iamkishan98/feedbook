const express = require("express")
const router = express.Router();

// Login/Landing page
// GET 
router.get('/', (req,res)=>{
    res.render('Login', {
        layout : 'login'
    });
});

router.get('/dashboard', (req,res)=>{
    res.render('Dashboard',{
        layout: 'main'
    });
});

module.exports = router;