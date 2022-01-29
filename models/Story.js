const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'public',
        enum: ['public','private']
    },
    byuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stories',StorySchema);