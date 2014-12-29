var http = require('http');
var url = require('url');
var fs = require('fs');

function start(route, handle){
	function onRequest(req, res){	 //request, response
		u = url.parse(req.url);
		pathname = u.pathname;
		console.log("Request for " + pathname + " received.");
		
		//route(pathname, handle, res);

		
/*	try{
		console.log("looking for file in: " + __dirname + " " + pathname);
		data = fs.readFileSync(__dirname + '' + pathname);//'/index.html')
		res.end(data);
		} catch(e){
			if (e.code === 'ENOENT') {
				console.log('File not found!');
			} else {
				console.log('wtf');
			}
		}
		res.writeHead(200);*/

		req.setEncoding('utf8');

		var postData = "";
		req.on('data', function(postDataChunk) {
		 // called when a new chunk of data was received
		 postData += postDataChunk;
		 console.log('Recieved POST data chunk: "'+ postDataChunk + '"');
		});

		req.addListener('end', function() {
 		// called when all chunks of data have been received
 		console.log("all Data arrived: " + postData);
 		route(pathname, handle, res, postData);
		});

		
	}
	http.createServer(onRequest).listen(8888);
	console.log('Console has started!');
}

exports.start = start;
