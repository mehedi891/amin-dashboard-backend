const { getAllSummaryData, createAsummary, getASummaryDataByMonthYear, updateASummaryData, updateRevReason } = require('../controller/summary.controller');

const router = require('express').Router();


router.get('/',getAllSummaryData);
router.post('/',createAsummary);
router.get('/:monthYear/:app',getASummaryDataByMonthYear);
router.put('/:monthYear/:app',updateASummaryData);
router.put('/rev-reason/:monthYear/:app',updateRevReason);

module.exports = router