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

describe('Students', function () {

  describe('GET all students', function () {
    it("should get all students list", function (done) {
      _chai2.default.request(_server2.default).get('/students').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should get a single student record", function (done) {
      var id = 1;
      _chai2.default.request(_server2.default).get('/students/' + id).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('student');
        done();
      });
    });
  });
});