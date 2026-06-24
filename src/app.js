const express = require('express');
const loanRequestRoutes = require('./routes/loanRequestRoutes');

const app = express();
app.use(express.json());
app.use('/api/loans', loanRequestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});