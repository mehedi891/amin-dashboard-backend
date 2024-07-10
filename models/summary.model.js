const mongoose = require('mongoose');



const summaryModel = new mongoose.Schema({
    uniqueCalls: {
        type: Number,
        default: 0,
    },
    totalAskRev: {
        type: Number,
        default: 0,
    },
    totalReviewGive: {
        type: Number,
        default: 0,
    },
    totalStore: {
        type: Number,
        default: 0,
    },
    totalCallCurrMonth: {
        type: Number,
        default: 0,
    },
    app:{
        type: String,
        require:true,
    },
    requirementNotMatch:{
        type:Number,
        default:0
    },
    developer:{
        type:Number,
        default:0
    },
    taskAdded:{
        type:Number,
        default:0
    },
    left:{
        type:Number,
        default:0
    },
    newExploring:{
        type:Number,
        default:0
    },
    monthYear:{
        type: String,
        default: new Date().getMonth()+1 + '-' + new Date().getFullYear(),
    }

  },{timestamps : true  }
  );

  module.exports = mongoose.model('summaryList',summaryModel);