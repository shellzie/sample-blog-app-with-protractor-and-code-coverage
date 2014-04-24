//var chai=require('chai');
//var chaiAsPromised=require('chai-as-promised');
//chai.use(chaiAsPromised);
//var expect=chai.expect;
//var protractor = require("protractor");

describe('overlay functional test', function() {

    var ptor, driver;

    beforeEach(function() {
        ptor = protractor.getInstance();
        driver = ptor.driver;
        ptor.ignoreSynchronization = true;
        browser.driver.get('http://localhost:3000/');
    });

    it('displays the popup on clicking the link on test page', function() {

        expect($("h1").getText()).toEqual("HELLO WORLD");
        var link = $("#greeting");
        link.click();
        ptor.sleep(5000);
        var section = $('div#hello');
        expect(section.getInnerHtml()).toEqual('Hello World');


    });
});


