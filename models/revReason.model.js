const mongoose = require('mongoose');

const revReasonModel = new mongoose.Schema({
    requireMentNotMatch:{
        type:Number,
        default: 0,
    },
    developer:{
        type:Number,
        default: 0,
    },
    taskAdded:{
        type:Number,
        default: 0,
    },
    left:{
        type:Number,
        default: 0,
    }

},{timestamps : true  }
);

module.exports = mongoose.model('revReasonModel',revReasonModel);


