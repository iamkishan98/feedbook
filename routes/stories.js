const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

// @desc Add story page 
//@route GET /stories/add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('stories/add');
});

//@desc Save story into database
//@route POST /stories/add
router.post('/add', ensureAuth, async (req,res)=>{
    console.log(req.body);
    try{
        const story = {
            title: req.body.title,
            body : req.body.body,
            status: req.body.status,
            byuser: req.user.id
        }

        const st = new Story(story);
        const result = await st.save();

        console.log(result);
        res.render('Dashboard');
    }
    catch(err){
        console.log(err.data);
        res.render('error/500');
    }
});

module.exports = router;