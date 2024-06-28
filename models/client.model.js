const mongoose = require('mongoose');

const clientModel = new mongoose.Schema({
    storeUrl: {
        type : String,
        require: true
    },
    bType : {
        type : String, 
    },
    reasonFromGivRev:{
        type : String,  
    },
    reasonFromAskRev:{
        type : String, 
    },
    reviewAsk:{
        type : String,
    },
    reviewGiven:{
        type : String,
    },
    comment:{
        type : String, 
    },
    noOfCalls:{
        type : Number,
        default: 0,
    },
    app:{
        type : String,        
    },
    callThisMonth:{
        type : Number, 
        default: 1
    },
    reviewAskCount:{
        type:Number,
        default:0,
    },
    clientType:{
        type:String,
        
    },
    timeAndDate : {
        type : Date,
        default : Date.now()
    },
    

  },{timestamps : true  }
  );

  module.exports = mongoose.model('ClientList',clientModel);