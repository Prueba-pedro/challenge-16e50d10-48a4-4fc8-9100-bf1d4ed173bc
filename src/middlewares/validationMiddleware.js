const { check, validationResult } = require('express-validator');

const validationMiddleware = [
  check('monto').isFloat({ min: 10000, max: 500000 }).withMessage('Monto debe estar entre 10,000 y 500,000'),
  check('plazo').isInt({ min: 12, max: 60 }).withMessage('Plazo debe estar entre 12 y 60 meses'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validationMiddleware;