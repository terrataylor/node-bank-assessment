import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

// Configure server
chai.use(chaiHttp);
chai.should();

describe('Till', () => {

  describe('GET coins in Till', () => {
    it("should get a count of coins in the till", (done) => {
      chai.request(server)
        .get('/till')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should get the value of coins in the till", (done) => {
      chai.request(server)
        .get('/till/value')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should add coins to the till", (done) => {
      let payload = { quarters: 1, dimes: 1, nickels: 1, pennies: 1 };
      chai.request(server)
        .put('/till/', payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should add coins to the till (PATCH)", (done) => {
      let payload = { quarters: 1, dimes: 1, nickels: 1, pennies: 1 };
      chai.request(server)
        .patch('/till/', payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should get change in coins from the till", (done) => {
      let amount = 1.46;
      chai.request(server)
        .post('/till/', amount)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should get log of failed transactions", (done) => {
      let amount = 1.46;
      chai.request(server)
        .get('/till/log')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.log.should.be.a('array');
          done();
        });
    });
  });


});