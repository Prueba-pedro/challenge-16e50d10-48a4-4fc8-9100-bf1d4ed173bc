const mongoose = require('mongoose');

const loanRequestSchema = new mongoose.Schema({
  monto: { type: Number, required: true },
  plazo: { type: Number, required: true },
  canal: { type: String, required: true },
  numeroOperacion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanRequest', loanRequestSchema);