const revReasonModel = require('../models/revReason.model');

const getAllRevReason = async(req,res) =>{
    try {
        const allRevReason = await revReasonModel.find({});
        res.status(200).json(allRevReason);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


const createARevReason = async(req,res)=>{
  try {
    const newRevReason = new revReasonModel(req.body);
    await newRevReason.save();
  
    res.status(200).json(newRevReason);
} catch (error) {
    res.status(404).json({
        message: error.message
    });
}

}

module.exports={
    getAllRevReason,
    createARevReason
}