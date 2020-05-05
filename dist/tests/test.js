'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure server
_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();

describe('Till', function () {

  describe('GET coins in Till', function () {
    it("should get a count of coins in the till", function (done) {
      _chai2.default.request(_server2.default).get('/till').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should get the value of coins in the till", function (done) {
      _chai2.default.request(_server2.default).get('/till/value').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should add coins to the till", function (done) {
      var payload = { quarters: 1, dimes: 1, nickels: 1, pennies: 1 };
      _chai2.default.request(_server2.default).put('/till/', payload).end(function (err, res) {
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