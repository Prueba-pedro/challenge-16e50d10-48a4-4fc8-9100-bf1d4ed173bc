const LoanRequest = require('../models/loanRequest');

const idempotencyMiddleware = async (req, res, next) => {
  const { numeroOperacion, canal } = req.body;
  const existingRequest = await LoanRequest.findOne({ numeroOperacion, canal });
  if (existingRequest) {
    return res.status(200).json(existingRequest);
  }
  next();
};

module.exports = idempotencyMiddleware;