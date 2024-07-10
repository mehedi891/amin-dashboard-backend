const { getAllRevReason, createARevReason } = require('../controller/revReason.controller');

const router = require('express').Router();

router.get('/',getAllRevReason);
router.post('/',createARevReason);

module.exports = router;