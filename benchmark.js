var apiBenchmark = require('api-benchmark');
var obj = require('./api/config/constants');
var utils = require('./api/config/utils');
var fs = require('fs');

var service = {
    server1: "https://devmobileui.infoedge.com"
};

var id='G30244743';

var routes = {
    property: {
        method: 'get',
        route: '/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json',
        headers: {
            'Accept': 'application/json'
        }
    }
};

apiBenchmark.measure(service, routes, function(err, results){
    console.log(results);
    apiBenchmark.getHtml(results, function(error, html){
        fs.writeFileSync('benchmarks.html', html);
      });
});