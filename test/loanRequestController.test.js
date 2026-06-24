const request = require('supertest');
const app = require('../../src/app');
const LoanRequest = require('../../src/models/loanRequest');

describe('Loan Request Controller', () => {
  afterEach(async () => {
    await LoanRequest.deleteMany({});
  });

  it('should create a new loan request', async () => {
    const res = await request(app)
     .post('/api/loans/requests')
     .send({
        monto: 20000,
        plazo: 24,
        canal: 'web',
        numeroOperacion: '12345'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});