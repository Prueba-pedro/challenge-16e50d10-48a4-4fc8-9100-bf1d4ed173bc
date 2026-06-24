const LoanRequest = require('../models/loanRequest');
const auditEvent = require('../utils/auditEvent');

const createLoanRequest = async (req, res) => {
  try {
    const loanRequest = new LoanRequest(req.body);
    await loanRequest.save();
    auditEvent.emit('loanRequestCreated', loanRequest);
    res.status(201).json(loanRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLoanRequest };