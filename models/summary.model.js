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
    totalStoreCallThisMonth:{
        type:Array,
        default:[]
        
    },
    totalStoreAskRevThisMonth:{
        type:Array,
        default:[]
    },
    totalStoreGivenRevThisMonth:{
        type:Array,
        default:[]
    },
    revReason:{
        type: Array,
        default:[]
    },
    monthYear:{
        type: String,
        default: new Date().getMonth()+1 + '-' + new Date().getFullYear(),
    }

  },{timestamps : true  }
  );

  module.exports = mongoose.model('summaryList',summaryModel);