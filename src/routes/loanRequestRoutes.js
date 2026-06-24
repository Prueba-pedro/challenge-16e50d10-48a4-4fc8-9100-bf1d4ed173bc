const express = require('express');
const router = express.Router();
const { createLoanRequest } = require('../controllers/loanRequestController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const idempotencyMiddleware = require('../middlewares/idempotencyMiddleware');

router.post('/requests', validationMiddleware, idempotencyMiddleware, createLoanRequest);

module.exports = router;