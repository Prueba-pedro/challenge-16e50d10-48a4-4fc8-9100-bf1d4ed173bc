const LoanRequest = require('../models/loanRequest');

const saveLoanRequest = async (loanRequestData) => {
  const loanRequest = new LoanRequest(loanRequestData);
  await loanRequest.save();
  return loanRequest;
};

module.exports = { saveLoanRequest };