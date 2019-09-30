var casper = require('casper').create({
    verbose: true,
    // logLevel: "debug",
    pageSettings: {
        webSecurityEnabled: false,
        loadImages:  true, 
        loadPlugins: true
    }
});

var x = require('casper').selectXPath;

casper.on("page.error", function(msg, trace) {
    console.log(msg);
    console.log('More info: ' + JSON.stringify(trace, null, 4));
});

casper.start();
casper.viewport(1200, 100);
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0.3 Safari/604.5.6');

if (casper.cli.args.length === 0 && Object.keys(casper.cli.options).length === 0) {
    this.echo("Usage: sample.js url").exit(1);
}

casper.thenOpen('https://ticket-monster.apps.pcfeu.dev.dynatracelabs.com/#/book/1/1', function(){
    this.echo(this.getTitle());
});

casper.waitForSelector(x('//*[@id="sectionSelect"]'))
    .then(function(){
        this.capture('bookings.png');
    }
);

/*

casper.then(function() {
    casper.page.customHeaders = {
        "X-Dark-Launch": "internal"
    }; // set headers
});

*/

casper.run();



