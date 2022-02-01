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
            user: req.user.id
        }

        const st = new Story(story);
        const result = await st.save();

        console.log(result);
        res.redirect('/dashboard');
    }
    catch(err){
        console.log(err.data);
        res.render('error/500');
    }
});


// @desc View Public stories
// @route GET /stories
router.get('/', ensureAuth , async(req,res)=>{
    console.log(req.user.id);
    try{
        const stories = await Story.find({status: 'public'})
                                .populate('user').sort({ createdAt : 'desc'}).lean();
        console.log(stories);
        res.render('stories/public_stories', {
            name : req.user.firstName,
            stories : stories
        });
    }
    catch(err){
        console.log(err.data);
        res.render('error/500');
    }

});

module.exports = router;