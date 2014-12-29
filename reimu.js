var server = require('./marisa');
var router = require('./nazrin');


var requestHandlers = require('./sakuya')

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload

server.start(router.route, handle);
