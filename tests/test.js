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
          console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    /* it("should get a single student record", (done) => {
       const id = 1;
       chai
         .request(server)
         .get(`/students/${id}`)
         .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('object');
           res.body.should.have.property('student');
           done();
         })
     })*/
  });


});