var chai = require('chai');
chai.use(require('chai-match'));
chai.use(require('chai-http'));
const expect = chai.expect;
const should = chai.should();
const nock = require('nock');
const fs = require('fs');
const _=require('lodash');
const supertest = require('supertest');
const api = supertest('http://localhost:3001');

const utils = require('../api/config/utils');
const obj = require("../api/config/constants");
const propertyController = require('../api/controllers/v1/propertyController');

describe('TestCase for Utility functions',function() {
  it('it should build proper API call url',()=>{
    expect(utils.buildPropertyDetailPath()).to.equal('/99mobapi/v0/propertyDetail/qwerty/000000000?rtype=json&moduleName=MOBILE_SITE_PD_VSP_PWA');
  });

  it('it should build proper API call url with given ID', function() {
      expect(utils.buildPropertyDetailPath('G30244743')).to.equal('/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json&moduleName=MOBILE_SITE_PD_VSP_PWA');
  });

  it('it should check for correct ID', function() {
      expect(utils.checkforId('G30244743')).to.equal(true)
  });

  it('it should check for incorrect ID', function() {
      expect(utils.checkforId('7-=d92di')).to.equal(false)
  });

});


describe('TestCase for PropertyController',function(){

  it('propertyController is an Object',function(done){
      _.isObject(propertyController).should.be.true;
      expect(propertyController).to.have.property("fetchById");
      expect(propertyController).to.have.property("apiRequest");
      done();
  });

  // it.only('apiRequest should return a promise',function(done){
  //     var testPromise = new Promise(function(resolve, reject) {
  //       // test with dummy ID
  //       propertyController.apiRequest('v1/properties/C33202995')
  //         .then(function(data) {
  //             resolve(data)
  //         }, function(err) {
  //             reject(err)
  //         })
  //     });
  //     return testPromise.then(function(result) {
  //         // try {
  //         //     expect(result).to.not.be.undefined;
  //         //     expect(result.status).to.equal(200);
  //         //     done();
  //         // } catch (err) {
  //         //     done(err);
  //         // }
  //         expect(result).to.not.be.undefined;
  //         expect(result).to.be.an('array');
  //     });
  // });
  //
  // it("fetchById is returning callBack",function(done){
  //   propertyController.fetchById(req,function(err,res){
  //     if(!err){
  //       chai.assert.isArray(res);
  //       expect(res).to.not.be.undefined;
  //       done();
  //     }
  //   });
  // });

});

describe('Testcase for routes',function(){
  it("should get array of JSON responses",function(done){
      api.get('/v1/properties/C33202995')
      .expect(200)
      .end(function(err,res){
           expect(typeof res).to.equal('object');
           //expect(res.body).to.have.property('');
           done();
      });
  });

});
