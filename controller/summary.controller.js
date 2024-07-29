const summaryModel = require('../models/summary.model');


const getAllSummaryData = async (req, res) => {
    try {
        const allSummaryData = await summaryModel.find({})
        res.status(200).json(allSummaryData);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


const createAsummary = async (req, res) => {
    const newSummary = new summaryModel(req.body);
    try {
        res.status(201).json(newSummary);
        await newSummary.save();
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}





// const updateASummaryData = async (req,res) =>{
//     const monthYear = req.params.monthYear.split('-' , 2);
//     const month = monthYear[0];
//     const year = monthYear[1];
//     const app = req.params.app;
//      const updatedSummaryData1 = req.body;
//      //console.log('month:',month);

//      //console.log(updatedSummaryData1)

//     try {
//         const isExist = await summaryModel.find({
//             $and: [{app:req.params.app},{monthYear:`${month}-${year}`}]
//         });
//         //console.log(isExist);
//     if(isExist.length > 0){
//         //console.log('from if sum');
//         if(req.body.updateAll){
//            // console.log('from if sum');
//             const result = await summaryModel.updateOne(
//                 {_id:isExist[0]._id},
//                 {
//                     $set: req.body
//                 },
//                 { upsert: false }
//             );

//             res.status(201).json({
//                         message: `Updated summaryData Successfully`,
//                         result
//                     });
//         }else{
//             //console.log('from else sum uiui');
//             const totalStore = req.body.incTotalStore ? isExist[0].totalStore + 1 : isExist[0].totalStore ;
//         const totalCallCurrMonth = req.body.incTotalCallCurrMonth ? isExist[0].totalCallCurrMonth + 1 : isExist[0].totalCallCurrMonth;
//         const totalAskRev = req.body.incTotalAskRev ? isExist[0].totalAskRev + 1 : isExist[0].totalAskRev;
//         const totalReviewGive = req.body.incTotalReviewGive ? isExist[0].totalReviewGive + 1 : isExist[0].totalReviewGive;
//         const uniqueCalls = req.body.incUniqueCalls ? isExist[0].uniqueCalls + 1 : isExist[0].uniqueCalls;
//         const revReason = req.body.revReason;


//         const updatedSummaryData = {
//             totalStore,
//             totalCallCurrMonth,
//             totalAskRev,
//             totalReviewGive,
//             uniqueCalls,
//             monthYear:`${month}-${year}`,
//             revReason,
//             app,
//         }
//         //console.log(updatedSummaryData ,'from if');
//         const result = await summaryModel.updateOne(
//             {_id:isExist[0]._id},
//             {
//                 $set: updatedSummaryData
//             },
//             { upsert: false }
//         );

//         res.status(201).json({
//                     message: `Updated summaryData Successfully`,
//                     result
//                 });
//         }


//     }else{
//         //console.log('from else sum');
//         const totalStore = req.body.incTotalStore ?  1 : 0 ;
//         const totalCallCurrMonth = req.body.incTotalCallCurrMonth ? 1 : 0 ;
//         const totalAskRev = req.body.incTotalAskRev ?  1 : 0;
//         const totalReviewGive = req.body.incTotalReviewGive ?  1 : 0;
//         const uniqueCalls = req.body.incUniqueCalls ? 1 : 0;
//         const updatedSummaryData = {
//             totalStore,
//             totalCallCurrMonth,
//             totalAskRev,
//             totalReviewGive,
//             uniqueCalls,
//             app,
//             monthYear:`${month}-${year}`,
//         }
//         //console.log(updatedSummaryData ,'from else');
//         const result = await summaryModel.updateOne(
//             {$and: [{app:req.params.app},{monthYear:`${month}-${year}`}]},
//             {
//                 $set: updatedSummaryData
//             },
//             { upsert: true }
//         );

//         res.status(201).json({
//                     message: `Updated summaryData Successfully`,
//                     result
//                 });

//     }


//     } catch (error) {
//         res.status(404).json({
//             message: error.message
//         });
//     }

// }

const updateASummaryData = async (req, res) => {
    const monthYear = req.params.monthYear.split('-', 2);
    const month = monthYear[0];
    const year = monthYear[1];
    const app = req.params.app;
    const updatedSummaryData = req.body;
    updatedSummaryData.monthYear = `${month}-${year}`;
    //console.log('month:',month);

    //console.log(updatedSummaryData1)

    try {
        const isExist = await summaryModel.find({
            $and: [{ app: req.params.app }, { monthYear: `${month}-${year}` }]
        });

        if (isExist.length > 0) {
            const result = await summaryModel.updateOne(
                { _id: isExist[0]._id },
                {
                    $set: req.body
                },
                { upsert: false }
            );

            res.status(201).json({
                message: `Updated summaryData Successfully`,
                result
            });

        } else {
            console.log("from eklse update",req.body)
            // const result = await summaryModel.updateOne(
            //     { _id: isExist[0]._id },
            //     {
            //         $set: req.body
            //     },
            //     { upsert: true }
            // );
            
            const result = new summaryModel(updatedSummaryData);
            await result.save();
            res.status(201).json({
                message: `Updated summaryData Successfully`,
                result
            });
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

}

const getASummaryDataByMonthYear = async (req, res) => {
    const monthYear = req.params.monthYear.split('-', 2);
    const month = monthYear[0];
    const year = monthYear[1];
    const filter = `${month}-${year}`;
    const currDate = new Date(`${year}-${month}`);
    currDate.setMonth(currDate.getMonth());
    const monthName = currDate.toLocaleString('default', { month: 'long' }).toLowerCase();
    //console.log(monthName);

    try {

        if (req.params.app !== 'total') {

            const aSummaryData = await summaryModel.findOne({
                $and: [{ app: req.params.app }, { monthYear: filter }]
            });
            if (aSummaryData) {
                res.status(200).json({
                    summary: aSummaryData,
                    monthName: `${monthName},${year}`,
                });
            }
            else {
                res.status(404).json({
                    summary: {},
                    message: `Sorry No Data Found For ${monthName},${year}`,
                    error: true,
                });
            }


        } else {

            const findSummaryDataAllByCurrMonth = await summaryModel.aggregate([
                { $match: { monthYear: `${filter}` } },
                {
                    $group: {
                        _id: '$monthYear',
                        totalCallCurrMonth: { $sum: '$totalCallCurrMonth' },
                        totalStore: { $sum: '$totalStore' },
                        totalAskRev: { $sum: '$totalAskRev' },
                        totalReviewGive: { $sum: '$totalReviewGive' },
                        uniqueCalls: { $sum: '$uniqueCalls' }
                    }
                }
            ]);
            if (findSummaryDataAllByCurrMonth.length <= 0) {
                res.status(404).json({
                    message: `Sorry No Data Found For ${monthName},${year}`,
                    error: true,
                })

            }
            else {
                res.status(200).json({
                    summary: findSummaryDataAllByCurrMonth[0],
                    monthName: `${monthName},${year}`,
                });
            }

        }

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }

}


const updateRevReason = async (req, res) => {
    const monthYear = req.params.monthYear.split('-', 2);
    const app = req.params.app;
    const month = monthYear[0];
    const year = monthYear[1];
    const filter = `${month}-${year}`;
    const currDate = new Date(`${year}-${month}`);
    currDate.setMonth(currDate.getMonth());
    //const monthName = currDate.toLocaleString('default', { month: 'long' }).toLowerCase();
    
    try {
        const isExist = await summaryModel.find({
            $and: [{ app: req.params.app }, { monthYear: `${month}-${year}` }]
        });

        let summaryObj = {};
   //console.log(req.body.storeUrl)

        if (isExist[0]) {
            const totalStoreCallThisMonth = !isExist[0].totalStoreCallThisMonth.includes(req.body.storeUrl) ? [...isExist[0].totalStoreCallThisMonth,req.body.storeUrl] : isExist[0].totalStoreCallThisMonth;

        const totalStore = isExist[0].totalStoreCallThisMonth.includes(req.body.storeUrl) ? isExist[0].totalStore : isExist[0].totalStore + 1;

        const totalCallCurrMonth = isExist[0].totalCallCurrMonth + 1;
        summaryObj = {
            totalStoreCallThisMonth,
            totalStore,
            totalCallCurrMonth

        }
            const result = await summaryModel.updateOne(
                { _id: isExist[0]._id },
                {
                    $set: summaryObj
                },
                { upsert: false }
            );
            //console.log(summaryObj);
            res.status(201).json({
                message: `Updated summaryData Successfullyyy`,
                result
            });
        }else{

            summaryObj = {
                totalStoreCallThisMonth:[req.body.storeUrl],
                totalStore:1,
                totalCallCurrMonth:1,
                app,
                monthYear:filter
    
            }


            const result = await summaryModel.updateOne(
                { _id: isExist[0]?._id },
                {
                    $set: summaryObj
                },
                { upsert: true }
            );
            console.log(summaryObj,"from else dasf");
            res.status(201).json({
                message: `Updated summaryData Successfullyyy ed`,
                result
            });
        }
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
}

module.exports = {
    getAllSummaryData,
    createAsummary,
    getASummaryDataByMonthYear,
    updateASummaryData,
    updateRevReason
}