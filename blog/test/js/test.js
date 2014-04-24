var chai=require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;
var protractor = require("protractor");
var assert= require("assert");

describe('Array', function(){
  describe('#indexOf()', function(){

      var ptor, driver;

      beforeEach(function() {
          ptor = protractor.getInstance();
          driver = ptor.driver;
          ptor.ignoreSynchronization = true;
          browser.driver.get('http://localhost:3000/');
      });


    it('should return -1 when the value is not present', function(){


      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(0, "cat".indexOf("c"));

    })
  })
})
