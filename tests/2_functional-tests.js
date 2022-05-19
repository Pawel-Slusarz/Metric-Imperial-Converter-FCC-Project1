const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('Test Get requests with /api/convert', function(){
    //#1
    test('Valid input: 10L', function(done){
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });
    
    //#2
    test('Invalid input unit: 32g', function(done){
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid unit');
          done();
        });
    });
    
    //#3
    test('Invalid number: 3/7.2/4kg', function(done){
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid number');
          done();
        });
    });
    
    //#4
    test('Invalid number and unit: 3/7.2/4kilomegagram', function(done){
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid number and unit')
          done();
        });
    });
    
    //#5
    test('No number: kg', function(done){
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });
  })
});
