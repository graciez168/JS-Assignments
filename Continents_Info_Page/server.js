

// Simple node server - CS22A
// The following function will be called whenever
// the server receives a request.

function servePage(request, response) {

    var supportedTypes = {
        'html': 'text/html; charset = UTF-8', 
        'txt': 'text/plain; charset = UTF-8',
        'js': 'application/javascript; charset = UTF-8',
        'appcache': 'text/cache-manifest; charset = UTF-8',
        'css': 'text/css; charset = UTF-8',
        'json': 'application/json; charset = UTF-8'
    }                         
    var filename = url.parse(request.url).pathname.substring(1); 
   
    if (!filename) {
        filename = 'home.html';
    }
    var extension = filename.substring( filename.lastIndexOf(".") + 1) 
    var type = supportedTypes[extension]; 

    fs.readFile( filename, function( err, content) {

        if (err) {  
            response.writeHead( 404, 
                               {'Content-Type': 'text/plain; charset = UTF-8'}); 
            response.write( err.message); 
            response.write( ' - The page requested is not found.'); 
            response.end(); 

        } else {  
            response.writeHead( 200, 
                               {'Content-Type': type});
            response.write(content); 
            response.end();
        }

    });   

};


var url = require('url');

var fs = require("fs");

var http = require('http');

var server = http.createServer(servePage);

server.listen(8080, 'localhost');

console.log('Server running at http://localhost:8080');